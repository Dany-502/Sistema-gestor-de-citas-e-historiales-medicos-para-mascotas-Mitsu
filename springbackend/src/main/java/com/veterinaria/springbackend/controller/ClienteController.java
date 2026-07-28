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
}
