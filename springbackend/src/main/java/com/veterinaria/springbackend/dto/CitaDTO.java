package com.veterinaria.springbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CitaDTO {
    private Integer idCita;
    private String mascotaId;
    private String nombreMascota;
    private Integer veterinarioId;
    private String nombreVeterinario;
    private Integer servicioId;
    private String nombreServicio;
    private LocalDateTime fechaHoraInicio;
    private LocalDateTime fechaHoraFin;
    private String descripcion;
    private String estado;
}
