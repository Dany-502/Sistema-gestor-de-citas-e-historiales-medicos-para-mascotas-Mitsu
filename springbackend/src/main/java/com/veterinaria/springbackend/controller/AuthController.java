package com.veterinaria.springbackend.controller;

import com.veterinaria.springbackend.dto.LoginRequestDTO;
import com.veterinaria.springbackend.dto.RegistroRequestDTO;
import com.veterinaria.springbackend.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/registro")
    public ResponseEntity<?> registrarCliente(@Valid @RequestBody RegistroRequestDTO request) {
        String mensaje = authService.registrarCliente(request);
        return ResponseEntity.ok(mensaje);
    }



    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO request) {
        String token = authService.login(request);

        // Devolvemos un JSON con el token para que React lo pueda guardar
        Map<String, String> respuesta = new HashMap<>();
        respuesta.put("token", token);
        respuesta.put("mensaje", "Inicio de sesión exitoso");

        return ResponseEntity.ok(respuesta);
    }
}