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

    public void cancelarCita(Integer idCita, String correoCliente) {
        Cliente cliente = clienteRepository.findByCorreoElectronico(correoCliente)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Cita cita = citaRepository.findById(idCita)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));

        if (!cita.getMascota().getCliente().getIdCliente().equals(cliente.getIdCliente())) {
            throw new RuntimeException("No tienes permiso para cancelar esta cita");
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
