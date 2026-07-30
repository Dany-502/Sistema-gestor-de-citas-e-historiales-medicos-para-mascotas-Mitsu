package com.veterinaria.springbackend.controller;

import com.veterinaria.springbackend.dto.VeterinarioDTO;
import com.veterinaria.springbackend.service.VeterinarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/veterinarios")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class VeterinarioController {

    private final VeterinarioService veterinarioService;

    @GetMapping
    public ResponseEntity<List<VeterinarioDTO>> obtenerTodos() {
        return ResponseEntity.ok(veterinarioService.obtenerTodos());
    }

    @PostMapping
    public ResponseEntity<VeterinarioDTO> registrarVeterinario(@RequestBody VeterinarioDTO dto) {
        return ResponseEntity.ok(veterinarioService.registrarVeterinario(dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarVeterinario(@PathVariable("id") Integer id) {
        veterinarioService.eliminarVeterinario(id);
        return ResponseEntity.ok().body("{\"mensaje\": \"Veterinario eliminado correctamente\"}");
    }
}
