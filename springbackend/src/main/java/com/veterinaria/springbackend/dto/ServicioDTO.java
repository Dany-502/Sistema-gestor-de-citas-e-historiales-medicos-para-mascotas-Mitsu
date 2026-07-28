package com.veterinaria.springbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServicioDTO {
    private Integer idServicio;
    private Integer idTipoServicio;
    private String nombreServicio;
    private Integer duracionTiempo;
    private BigDecimal precio;
    private Boolean activo;
}
