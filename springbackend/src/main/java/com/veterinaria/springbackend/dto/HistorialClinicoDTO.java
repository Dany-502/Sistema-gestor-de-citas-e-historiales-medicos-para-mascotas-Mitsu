package com.veterinaria.springbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HistorialClinicoDTO {
    private Integer idHistorial;
    private String idMascota;
    private Integer idCita;
    private LocalDate fecha; // Derived from cita.fechaHoraInicio
    private String motivo; // mapped to descripcionCita
    private String diagnostico;
    private String veterinario; // Derived from cita.veterinario
}
