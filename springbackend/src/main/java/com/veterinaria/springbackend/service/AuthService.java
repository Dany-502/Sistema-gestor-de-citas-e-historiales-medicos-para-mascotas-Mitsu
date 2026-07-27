package com.veterinaria.springbackend.service;

import com.veterinaria.springbackend.config.JwtUtil;
import com.veterinaria.springbackend.dto.LoginRequestDTO;
import com.veterinaria.springbackend.dto.RegistroRequestDTO;
import com.veterinaria.springbackend.entity.Cliente;
import com.veterinaria.springbackend.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil; // Inyectamos la fábrica de tokens

    public String registrarCliente(RegistroRequestDTO dto) {
        if (clienteRepository.existsByCorreoElectronico(dto.getCorreoElectronico())) {
            throw new RuntimeException("El correo ya está registrado en el sistema");
        }

        Cliente cliente = new Cliente();
        cliente.setNombre(dto.getNombre());
        cliente.setApPaterno(dto.getApPaterno());
        cliente.setApMaterno(dto.getApMaterno());
        cliente.setDireccion(dto.getDireccion());
        cliente.setTelefono(dto.getTelefono());
        cliente.setCorreoElectronico(dto.getCorreoElectronico());
        cliente.setContrasena(passwordEncoder.encode(dto.getContrasena()));

        clienteRepository.save(cliente);

        return "Cliente registrado con éxito";
    }

    public String login(LoginRequestDTO loginDTO) {
        // 1. Buscar al cliente por correo
        Cliente cliente = clienteRepository.findByCorreoElectronico(loginDTO.getCorreoElectronico())
                .orElseThrow(() -> new RuntimeException("Credenciales incorrectas"));

        // 2. Verificar que la contraseña plana coincida con la encriptada
        if (!passwordEncoder.matches(loginDTO.getContrasena(), cliente.getContrasena())) {
            throw new RuntimeException("Credenciales incorrectas");
        }

        // 3. Generar y devolver el token JWT
        return jwtUtil.generarToken(cliente.getCorreoElectronico());
    }
}