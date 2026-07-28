package com.veterinaria.springbackend.service;

import com.veterinaria.springbackend.dto.MascotaDTO;
import com.veterinaria.springbackend.entity.Cliente;
import com.veterinaria.springbackend.entity.Mascota;
import com.veterinaria.springbackend.repository.ClienteRepository;
import com.veterinaria.springbackend.repository.MascotaRepository;
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
                .build();
    }
}
