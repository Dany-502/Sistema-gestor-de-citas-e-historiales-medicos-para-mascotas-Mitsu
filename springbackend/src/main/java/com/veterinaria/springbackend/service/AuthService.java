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
    private final com.veterinaria.springbackend.repository.VeterinarioRepository veterinarioRepository;
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

    public java.util.Map<String, String> login(LoginRequestDTO loginDTO) {
        String correo = loginDTO.getCorreoElectronico();
        String pass = loginDTO.getContrasena();

        // 0. Credencial estática de pruebas para Dr. Alejandro (funciona con o sin base de datos)
        if ("dr.alejandro@mitsu.com".equalsIgnoreCase(correo)) {
            String token = jwtUtil.generarToken("dr.alejandro@mitsu.com");
            java.util.Map<String, String> res = new java.util.HashMap<>();
            res.put("token", token);
            res.put("rol", "VETERINARIO");
            res.put("nombre", "Dr. Alejandro Fernández Luna");
            res.put("mensaje", "Inicio de sesión exitoso como Veterinario");
            return res;
        }

        // Credencial estática de pruebas para Miguel (Cliente)
        if ("miguel@mitsu.com".equalsIgnoreCase(correo)) {
            String token = jwtUtil.generarToken("miguel@mitsu.com");
            java.util.Map<String, String> res = new java.util.HashMap<>();
            res.put("token", token);
            res.put("rol", "CLIENTE");
            res.put("nombre", "Miguel Alberto Alonso");
            res.put("mensaje", "Inicio de sesión exitoso como Cliente");
            return res;
        }

        // Credencial estática de pruebas para Administrador
        if ("admin@mitsu.com".equalsIgnoreCase(correo) || "admin@mistu.com".equalsIgnoreCase(correo)) {
            String token = jwtUtil.generarToken("admin@mitsu.com");
            java.util.Map<String, String> res = new java.util.HashMap<>();
            res.put("token", token);
            res.put("rol", "ADMIN");
            res.put("nombre", "Administrador Mitsu");
            res.put("mensaje", "Inicio de sesión exitoso como Administrador");
            return res;
        }

        try {
            // 1. Intentar autenticar como Veterinario desde BD
        var optVet = veterinarioRepository.findByCorreoElectronico(correo);
        if (optVet.isPresent()) {
            var vet = optVet.get();
            boolean match = passwordEncoder.matches(pass, vet.getContrasena()) || pass.equals(vet.getContrasena());
            if (match) {
                String token = jwtUtil.generarToken(vet.getCorreoElectronico());
                java.util.Map<String, String> res = new java.util.HashMap<>();
                res.put("token", token);
                res.put("rol", "VETERINARIO");
                res.put("nombre", vet.getNombre() + " " + vet.getApPaterno());
                res.put("mensaje", "Inicio de sesión exitoso como Veterinario");
                return res;
            }
        }

        // 2. Intentar autenticar como Cliente
        Cliente cliente = clienteRepository.findByCorreoElectronico(correo)
                .orElseThrow(() -> new RuntimeException("Credenciales incorrectas"));

        boolean match = passwordEncoder.matches(pass, cliente.getContrasena()) || pass.equals(cliente.getContrasena());
        if (!match) {
            throw new RuntimeException("Credenciales incorrectas");
        }

        String token = jwtUtil.generarToken(cliente.getCorreoElectronico());
        java.util.Map<String, String> res = new java.util.HashMap<>();
        res.put("token", token);
        res.put("rol", "CLIENTE");
        res.put("nombre", cliente.getNombre() + " " + cliente.getApPaterno());
        res.put("mensaje", "Inicio de sesión exitoso como Cliente");
        return res;
        } catch (Exception ex) {
            throw new RuntimeException("Credenciales incorrectas");
        }
    }
}