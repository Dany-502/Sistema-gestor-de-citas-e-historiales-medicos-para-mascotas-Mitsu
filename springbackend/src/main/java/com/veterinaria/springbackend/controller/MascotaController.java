package com.veterinaria.springbackend.controller;

import com.veterinaria.springbackend.dto.MascotaDTO;
import com.veterinaria.springbackend.service.MascotaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MascotaController {

    private final MascotaService mascotaService;

    @GetMapping
    public ResponseEntity<List<MascotaDTO>> obtenerMascotas(Authentication authentication) {
        String correo = authentication.getName();
        List<MascotaDTO> mascotas = mascotaService.obtenerMascotasPorCliente(correo);
        return ResponseEntity.ok(mascotas);
    }

    @PostMapping
    public ResponseEntity<MascotaDTO> registrarMascota(@RequestBody MascotaDTO dto, Authentication authentication) {
        String correo = authentication.getName();
        MascotaDTO nuevaMascota = mascotaService.registrarMascota(dto, correo);
        return ResponseEntity.ok(nuevaMascota);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MascotaDTO> actualizarMascota(@PathVariable("id") String idMascota,
            @RequestBody MascotaDTO dto,
            Authentication authentication) {
        String correo = authentication.getName();
        MascotaDTO actualizada = mascotaService.actualizarMascota(idMascota, dto, correo);
        return ResponseEntity.ok(actualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarMascota(@PathVariable("id") String idMascota, Authentication authentication) {
        String correo = authentication.getName();
        mascotaService.eliminarMascota(idMascota, correo);
        return ResponseEntity.ok().body("{\"mensaje\": \"Mascota eliminada correctamente\"}");
    }
}
