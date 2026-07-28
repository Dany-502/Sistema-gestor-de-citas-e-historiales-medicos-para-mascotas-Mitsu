package com.veterinaria.springbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HorarioDTO {
    private Integer idHorario;
    private String diaSemana;
    private String horaInicio;
    private String horaFin;
}
