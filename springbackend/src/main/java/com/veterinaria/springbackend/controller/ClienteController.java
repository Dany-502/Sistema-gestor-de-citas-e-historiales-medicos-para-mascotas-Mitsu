package com.veterinaria.springbackend.controller;

import com.veterinaria.springbackend.dto.ClienteResponseDTO;
import com.veterinaria.springbackend.entity.Cliente;
import com.veterinaria.springbackend.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ClienteController {

    private final ClienteRepository clienteRepository;
    private final com.veterinaria.springbackend.repository.MascotaRepository mascotaRepository;

    @GetMapping("/me")
    public ResponseEntity<ClienteResponseDTO> obtenerPerfil(Authentication authentication) {
        String correo = authentication.getName();
        Cliente cliente = clienteRepository.findByCorreoElectronico(correo)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado con el correo: " + correo));

        String nombreCompleto = cliente.getNombre() + " " + cliente.getApPaterno() + " " + cliente.getApMaterno();

        ClienteResponseDTO dto = ClienteResponseDTO.builder()
                .idCliente(cliente.getIdCliente())
                .nombre(cliente.getNombre())
                .apPaterno(cliente.getApPaterno())
                .apMaterno(cliente.getApMaterno())
                .nombreCompleto(nombreCompleto.trim())
                .direccion(cliente.getDireccion())
                .telefono(cliente.getTelefono())
                .correoElectronico(cliente.getCorreoElectronico())
                .build();

        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<java.util.List<ClienteResponseDTO>> obtenerTodosLosClientes() {
        java.util.List<Cliente> clientes = clienteRepository.findAll();
        java.util.List<ClienteResponseDTO> resultado = clientes.stream().map(cliente -> {
            java.util.List<com.veterinaria.springbackend.entity.Mascota> mascotasEntity = mascotaRepository.findByClienteIdCliente(cliente.getIdCliente());
            java.util.List<com.veterinaria.springbackend.dto.MascotaDTO> mascotasDTO = mascotasEntity.stream().map(m -> 
                com.veterinaria.springbackend.dto.MascotaDTO.builder()
                    .idMascota(m.getIdMascota())
                    .nombreMascota(m.getNombreMascota())
                    .especie(m.getEspecie())
                    .raza(m.getRaza())
                    .fechaNacimiento(m.getFechaNacimiento())
                    .sexo(m.getSexo())
                    .color(m.getColor())
                    .peso(m.getPeso())
                    .alergias(m.getAlergias())
                    .descripcion(m.getDescripcion())
                    .informacionAdicional(m.getDescripcion())
                    .adultoResponsable(cliente.getNombre() + " " + cliente.getApPaterno())
                    .estado(m.getEstado())
                    .fotoUrl(m.getImagen())
                    .build()
            ).collect(java.util.stream.Collectors.toList());

            String nombreCompleto = cliente.getNombre() + " " + cliente.getApPaterno() + " " + (cliente.getApMaterno() != null ? cliente.getApMaterno() : "");

            return ClienteResponseDTO.builder()
                    .idCliente(cliente.getIdCliente())
                    .nombre(cliente.getNombre())
                    .apPaterno(cliente.getApPaterno())
                    .apMaterno(cliente.getApMaterno())
                    .nombreCompleto(nombreCompleto.trim())
                    .direccion(cliente.getDireccion())
                    .telefono(cliente.getTelefono())
                    .correoElectronico(cliente.getCorreoElectronico())
                    .cantidadMascotas(mascotasDTO.size())
                    .mascotas(mascotasDTO)
                    .build();
        }).collect(java.util.stream.Collectors.toList());

        return ResponseEntity.ok(resultado);
    }
}
