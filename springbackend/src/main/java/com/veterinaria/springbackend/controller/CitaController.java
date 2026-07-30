package com.veterinaria.springbackend.controller;

import com.veterinaria.springbackend.dto.CitaDTO;
import com.veterinaria.springbackend.dto.CrearCitaDTO;
import com.veterinaria.springbackend.service.CitaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/citas")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CitaController {

    private final CitaService citaService;
    private final com.veterinaria.springbackend.service.RecordatorioCitasTask recordatorioCitasTask;

    @GetMapping("/mis-citas")
    public ResponseEntity<List<CitaDTO>> obtenerMisCitas(Authentication authentication) {
        String correo = authentication.getName();
        return ResponseEntity.ok(citaService.obtenerMisCitas(correo));
    }

    @GetMapping("/todas")
    public ResponseEntity<List<CitaDTO>> obtenerTodasLasCitas() {
        return ResponseEntity.ok(citaService.obtenerTodasLasCitas());
    }

    @PostMapping
    public ResponseEntity<CitaDTO> crearCita(@Valid @RequestBody CrearCitaDTO dto, Authentication authentication) {
        String correo = authentication.getName();
        return new ResponseEntity<>(citaService.crearCita(dto, correo), HttpStatus.CREATED);
    }

    @DeleteMapping("/{idCita}")
    public ResponseEntity<Void> cancelarCita(@PathVariable Integer idCita, Authentication authentication) {
        String correo = authentication.getName();
        citaService.cancelarCita(idCita, correo);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/probar-recordatorios")
    public ResponseEntity<String> probarRecordatorios() {
        int total = recordatorioCitasTask.ejecutarProcesoRecordatorios();
        return ResponseEntity.ok("Proceso de recordatorio 24h ejecutado. Citas procesadas: " + total);
    }
}
