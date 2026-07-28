package com.veterinaria.springbackend.controller;

import com.veterinaria.springbackend.dto.ServicioDTO;
import com.veterinaria.springbackend.service.ServicioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/servicios")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ServicioController {

    private final ServicioService servicioService;

    @GetMapping
    public ResponseEntity<List<ServicioDTO>> obtenerActivos() {
        return ResponseEntity.ok(servicioService.obtenerActivos());
    }
}
