package com.veterinaria.springbackend.service;

import com.veterinaria.springbackend.dto.MascotaDTO;
import com.veterinaria.springbackend.dto.HistorialClinicoDTO;
import com.veterinaria.springbackend.dto.VacunaMascotaDTO;
import com.veterinaria.springbackend.entity.Cita;
import com.veterinaria.springbackend.entity.Cliente;
import com.veterinaria.springbackend.entity.HistorialClinico;
import com.veterinaria.springbackend.entity.Mascota;
import com.veterinaria.springbackend.entity.VacunaMascota;
import com.veterinaria.springbackend.repository.CitaRepository;
import com.veterinaria.springbackend.repository.ClienteRepository;
import com.veterinaria.springbackend.repository.HistorialClinicoRepository;
import com.veterinaria.springbackend.repository.MascotaRepository;
import com.veterinaria.springbackend.repository.VacunaMascotaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MascotaService {

    private final MascotaRepository mascotaRepository;
    private final ClienteRepository clienteRepository;
    private final VacunaMascotaRepository vacunaMascotaRepository;
    private final HistorialClinicoRepository historialClinicoRepository;
    private final CitaRepository citaRepository;

    @Transactional(readOnly = true)
    public List<MascotaDTO> obtenerMascotasPorCliente(String correoCliente) {
        Cliente cliente = clienteRepository.findByCorreoElectronico(correoCliente)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con el correo: " + correoCliente));

        String adultoResponsable = cliente.getNombre() + " " + cliente.getApPaterno();

        return mascotaRepository.findByClienteCorreoElectronico(correoCliente).stream()
                .filter(mascota -> !"Inactivo".equalsIgnoreCase(mascota.getEstado()))
                .map(mascota -> convertirADTO(mascota, adultoResponsable))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MascotaDTO> obtenerTodasLasMascotas() {
        return mascotaRepository.findAll().stream()
                .filter(mascota -> !"Inactivo".equalsIgnoreCase(mascota.getEstado()))
                .map(mascota -> {
                    Cliente c = mascota.getCliente();
                    String adulto = c != null ? c.getNombre() + " " + c.getApPaterno() : "No registrado";
                    return convertirADTO(mascota, adulto);
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<MascotaDTO> obtenerMascotasPorVeterinario(String correo) {
        return mascotaRepository.findMascotasByVeterinario(correo).stream()
                .filter(mascota -> !"Inactivo".equalsIgnoreCase(mascota.getEstado()))
                .map(mascota -> {
                    Cliente c = mascota.getCliente();
                    String adulto = c != null ? c.getNombre() + " " + c.getApPaterno() : "No registrado";
                    return convertirADTO(mascota, adulto);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public MascotaDTO registrarMascota(MascotaDTO dto, String correoCliente) {
        Cliente cliente = clienteRepository.findByCorreoElectronico(correoCliente)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));

        Mascota mascota = new Mascota();

        // Generar un ID único de 18 caracteres si no viene especificado
        String idMascota = dto.getIdMascota();
        if (idMascota == null || idMascota.trim().isEmpty()) {
            idMascota = "#MS" + UUID.randomUUID().toString().replace("-", "").substring(0, 14).toUpperCase();
        }
        mascota.setIdMascota(idMascota);
        mascota.setCliente(cliente);
        
        copiarDatosDTOAEntidad(dto, mascota);

        Mascota mascotaGuardada = mascotaRepository.save(mascota);
        String adultoResponsable = cliente.getNombre() + " " + cliente.getApPaterno();

        return convertirADTO(mascotaGuardada, adultoResponsable);
    }

    @Transactional
    public MascotaDTO actualizarMascota(String idMascota, MascotaDTO dto, String correoCliente) {
        Mascota mascota = mascotaRepository.findByIdMascotaAndClienteCorreoElectronico(idMascota, correoCliente)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada o no pertenece al cliente logueado"));

        copiarDatosDTOAEntidad(dto, mascota);

        Mascota mascotaActualizada = mascotaRepository.save(mascota);
        Cliente cliente = mascota.getCliente();
        String adultoResponsable = cliente.getNombre() + " " + cliente.getApPaterno();

        return convertirADTO(mascotaActualizada, adultoResponsable);
    }

    @Transactional
    public void eliminarMascota(String idMascota, String correoCliente) {
        Mascota mascota = mascotaRepository.findByIdMascotaAndClienteCorreoElectronico(idMascota, correoCliente)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada o no pertenece al cliente logueado"));

        mascota.setEstado("Inactivo");
        mascotaRepository.save(mascota);
    }

    @Transactional
    public VacunaMascotaDTO registrarVacuna(String idMascota, VacunaMascotaDTO dto) {
        Mascota mascota = mascotaRepository.findById(idMascota)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));

        VacunaMascota vacuna = VacunaMascota.builder()
                .mascota(mascota)
                .nombreDosis(dto.getVacuna())
                .fechaAplicacion(dto.getFecha())
                .fechaProxAplicacion(dto.getProxima())
                .pesoAplicacion(dto.getPeso())
                .build();
        
        vacuna = vacunaMascotaRepository.save(vacuna);

        return VacunaMascotaDTO.builder()
                .idAplicacion(vacuna.getIdAplicacion())
                .idMascota(vacuna.getMascota().getIdMascota())
                .vacuna(vacuna.getNombreDosis())
                .fecha(vacuna.getFechaAplicacion())
                .proxima(vacuna.getFechaProxAplicacion())
                .peso(vacuna.getPesoAplicacion())
                .build();
    }

    @Transactional
    public HistorialClinicoDTO registrarHistorial(String idMascota, HistorialClinicoDTO dto) {
        Mascota mascota = mascotaRepository.findById(idMascota)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));
        
        Cita cita = citaRepository.findById(dto.getIdCita())
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));

        HistorialClinico historial = HistorialClinico.builder()
                .mascota(mascota)
                .cita(cita)
                .descripcionCita(dto.getMotivo())
                .diagnostico(dto.getDiagnostico())
                .build();
        
        historial = historialClinicoRepository.save(historial);

        String nombreVet = cita.getVeterinario() != null ? "Dr. " + cita.getVeterinario().getApPaterno() : "Veterinario";

        return HistorialClinicoDTO.builder()
                .idHistorial(historial.getIdHistorial())
                .idMascota(mascota.getIdMascota())
                .idCita(cita.getIdCita())
                .fecha(cita.getFechaHoraInicio() != null ? cita.getFechaHoraInicio().toLocalDate() : null)
                .motivo(historial.getDescripcionCita())
                .diagnostico(historial.getDiagnostico())
                .veterinario(nombreVet)
                .build();
    }

    private void copiarDatosDTOAEntidad(MascotaDTO dto, Mascota mascota) {
        String nombre = dto.getNombreMascota();
        if (nombre != null && !nombre.trim().isEmpty()) {
            mascota.setNombreMascota(nombre);
        } else if (mascota.getNombreMascota() == null) {
            throw new RuntimeException("El nombre de la mascota es obligatorio.");
        }

        if (dto.getEspecie() != null) {
            mascota.setEspecie(dto.getEspecie());
        }
        if (dto.getRaza() != null) {
            mascota.setRaza(dto.getRaza());
        }
        if (dto.getFechaNacimiento() != null) {
            mascota.setFechaNacimiento(dto.getFechaNacimiento());
        }
        if (dto.getSexo() != null) {
            mascota.setSexo(dto.getSexo());
        }
        if (dto.getColor() != null) {
            mascota.setColor(dto.getColor());
        }
        if (dto.getPeso() != null) {
            mascota.setPeso(dto.getPeso());
        }
        
        String desc = dto.getDescripcion() != null ? dto.getDescripcion() : dto.getInformacionAdicional();
        if (desc != null) {
            mascota.setDescripcion(desc);
        }
        if (dto.getAlergias() != null) {
            mascota.setAlergias(dto.getAlergias());
        }
        if (dto.getFotoUrl() != null) {
            mascota.setImagen(dto.getFotoUrl());
        }
        if (dto.getEstado() != null) {
            mascota.setEstado(dto.getEstado());
        } else if (mascota.getEstado() == null) {
            mascota.setEstado("Activo");
        }
    }

    private MascotaDTO convertirADTO(Mascota mascota, String adultoResponsable) {
        List<VacunaMascotaDTO> vacunas = vacunaMascotaRepository.findByMascotaIdMascotaOrderByFechaAplicacionDesc(mascota.getIdMascota())
                .stream().map(v -> VacunaMascotaDTO.builder()
                        .idAplicacion(v.getIdAplicacion())
                        .idMascota(mascota.getIdMascota())
                        .vacuna(v.getNombreDosis())
                        .fecha(v.getFechaAplicacion())
                        .proxima(v.getFechaProxAplicacion())
                        .peso(v.getPesoAplicacion())
                        .build()).collect(Collectors.toList());

        List<HistorialClinicoDTO> historial = historialClinicoRepository.findByMascotaIdMascotaOrderByCitaFechaHoraInicioDesc(mascota.getIdMascota())
                .stream().map(h -> {
                    String vetName = h.getCita().getVeterinario() != null ? h.getCita().getVeterinario().getNombre() + " " + h.getCita().getVeterinario().getApPaterno() : "Veterinario";
                    return HistorialClinicoDTO.builder()
                        .idHistorial(h.getIdHistorial())
                        .idMascota(mascota.getIdMascota())
                        .idCita(h.getCita().getIdCita())
                        .fecha(h.getCita().getFechaHoraInicio() != null ? h.getCita().getFechaHoraInicio().toLocalDate() : null)
                        .motivo(h.getDescripcionCita())
                        .diagnostico(h.getDiagnostico())
                        .veterinario(vetName)
                        .build();
                }).collect(Collectors.toList());

        return MascotaDTO.builder()
                .idMascota(mascota.getIdMascota())
                .nombreMascota(mascota.getNombreMascota())
                .especie(mascota.getEspecie())
                .raza(mascota.getRaza())
                .fechaNacimiento(mascota.getFechaNacimiento())
                .sexo(mascota.getSexo())
                .color(mascota.getColor())
                .peso(mascota.getPeso())
                .alergias(mascota.getAlergias())
                .descripcion(mascota.getDescripcion())
                .informacionAdicional(mascota.getDescripcion())
                .adultoResponsable(adultoResponsable)
                .estado(mascota.getEstado() != null ? mascota.getEstado() : "Activo")
                .fotoUrl(mascota.getImagen())
                .historialVacunas(vacunas)
                .historialCitas(historial)
                .build();
    }
}
