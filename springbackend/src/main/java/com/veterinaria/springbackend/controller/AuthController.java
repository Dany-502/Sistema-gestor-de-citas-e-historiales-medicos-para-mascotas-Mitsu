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
        Map<String, String> respuesta = authService.login(request);
        return ResponseEntity.ok(respuesta);
    }
}