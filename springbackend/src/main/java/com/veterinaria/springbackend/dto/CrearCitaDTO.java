package com.veterinaria.springbackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrearCitaDTO {

    @NotBlank(message = "Debe seleccionar una mascota")
    private String mascotaId;

    @NotNull(message = "Debe seleccionar un veterinario")
    private Integer veterinarioId;

    @NotNull(message = "Debe seleccionar un servicio")
    private Integer servicioId;

    @NotNull(message = "La fecha y hora de inicio es obligatoria")
    private LocalDateTime fechaHoraInicio;

    private String descripcion;
}
