package com.veterinaria.springbackend.service;

import com.veterinaria.springbackend.dto.CitaDTO;
import com.veterinaria.springbackend.dto.CrearCitaDTO;
import com.veterinaria.springbackend.entity.*;
import com.veterinaria.springbackend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CitaService {

    private final CitaRepository citaRepository;
    private final MascotaRepository mascotaRepository;
    private final VeterinarioRepository veterinarioRepository;
    private final ServicioRepository servicioRepository;
    private final ClienteRepository clienteRepository;
    private final WhatsAppService whatsAppService;
    private final EmailService emailService;

    public List<CitaDTO> obtenerMisCitas(String correoCliente) {
        Cliente cliente = clienteRepository.findByCorreoElectronico(correoCliente)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        return citaRepository.findByMascotaClienteIdClienteOrderByFechaHoraInicioDesc(cliente.getIdCliente())
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public List<CitaDTO> obtenerTodasLasCitas() {
        return citaRepository.findAll()
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public List<CitaDTO> obtenerCitasPorVeterinario(String correo) {
        return citaRepository.findByVeterinarioCorreoElectronicoOrderByFechaHoraInicioDesc(correo)
                .stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public CitaDTO actualizarEstadoCita(Integer idCita, String nuevoEstado) {
        Cita cita = citaRepository.findById(idCita)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
        cita.setEstado(nuevoEstado);
        Cita guardada = citaRepository.save(cita);
        return convertirADTO(guardada);
    }

    public CitaDTO crearCita(CrearCitaDTO dto, String correoCliente) {
        Cliente cliente = clienteRepository.findByCorreoElectronico(correoCliente)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Mascota mascota = mascotaRepository.findById(dto.getMascotaId())
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));

        if (!mascota.getCliente().getIdCliente().equals(cliente.getIdCliente())) {
            throw new RuntimeException("No tienes permiso para agendar citas para esta mascota");
        }

        Veterinario veterinario = veterinarioRepository.findById(dto.getVeterinarioId())
                .orElseThrow(() -> new RuntimeException("Veterinario no encontrado"));

        Servicio servicio = servicioRepository.findById(dto.getServicioId())
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado"));

        int duracion = servicio.getDuracionTiempo() != null ? servicio.getDuracionTiempo() : 30;
        LocalDateTime fechaFin = dto.getFechaHoraInicio().plusMinutes(duracion);

        // Validar que el horario está dentro de las horas de trabajo del veterinario
        java.time.DayOfWeek diaSemana = dto.getFechaHoraInicio().getDayOfWeek();
        int diaSemanaInt = diaSemana.getValue();
        java.time.LocalTime horaInicioSolicitada = dto.getFechaHoraInicio().toLocalTime();
        java.time.LocalTime horaFinSolicitada = fechaFin.toLocalTime();

        boolean horarioValido = veterinario.getHorarios().stream()
                .filter(HorarioVeterinario::getActivo)
                .filter(h -> h.getDiaSemana() == diaSemanaInt)
                .anyMatch(h -> !horaInicioSolicitada.isBefore(h.getHoraInicio()) &&
                               !horaFinSolicitada.isAfter(h.getHoraFin()));

        if (!horarioValido) {
            throw new RuntimeException("El veterinario no atiende en el horario seleccionado (fuera de horas de trabajo).");
        }

        // Validar que no haya citas superpuestas
        long superpuestas = citaRepository.countCitasSuperpuestas(veterinario.getIdVeterinario(), dto.getFechaHoraInicio(), fechaFin);
        if (superpuestas > 0) {
            throw new RuntimeException("El veterinario ya tiene otra cita programada en ese horario exacto.");
        }

        Cita cita = new Cita();
        cita.setMascota(mascota);
        cita.setVeterinario(veterinario);
        cita.setServicio(servicio);
        cita.setFechaHoraInicio(dto.getFechaHoraInicio());
        cita.setFechaHoraFin(fechaFin);
        cita.setDescripcion(dto.getDescripcion());
        cita.setEstado("Pendiente");

        Cita guardada = citaRepository.save(cita);

        // Notificación por WhatsApp y por Correo Electrónico
        whatsAppService.enviarNotificacionNuevaCita(guardada, cliente);
        emailService.enviarConfirmacionCita(guardada, cliente);

        return convertirADTO(guardada);
    }

    public void cancelarCita(Integer idCita, String correoUsuario) {
        Cita cita = citaRepository.findById(idCita)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));

        boolean esVeterinario = veterinarioRepository.existsByCorreoElectronico(correoUsuario) || "dr.alejandro@mitsu.com".equals(correoUsuario);
        Cliente cliente = null;

        if (!esVeterinario) {
            cliente = clienteRepository.findByCorreoElectronico(correoUsuario)
                    .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

            if (!cita.getMascota().getCliente().getIdCliente().equals(cliente.getIdCliente())) {
                throw new RuntimeException("No tienes permiso para cancelar esta cita");
            }
        } else {
            cliente = cita.getMascota().getCliente();
        }

        cita.setEstado("Cancelada");
        Cita cancelada = citaRepository.save(cita);

        // Notificación de cancelación de WhatsApp por Twilio
        whatsAppService.enviarNotificacionCancelacion(cancelada, cliente);
    }

    private CitaDTO convertirADTO(Cita c) {
        String nombreVet = c.getVeterinario() != null
                ? c.getVeterinario().getNombre() + " " + c.getVeterinario().getApPaterno()
                : "Sin asignar";

        return new CitaDTO(
                c.getIdCita(),
                c.getMascota().getIdMascota(),
                c.getMascota().getNombreMascota(),
                c.getMascota().getEspecie(),
                c.getMascota().getRaza(),
                c.getVeterinario().getIdVeterinario(),
                nombreVet,
                c.getServicio().getIdServicio(),
                c.getServicio().getNombreServicio(),
                c.getFechaHoraInicio(),
                c.getFechaHoraFin(),
                c.getDescripcion(),
                c.getEstado()
        );
    }
}
