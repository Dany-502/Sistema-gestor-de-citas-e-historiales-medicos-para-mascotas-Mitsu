package com.veterinaria.springbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VacunaMascotaDTO {
    private Integer idAplicacion;
    private String idMascota;
    private String vacuna; // mapped to nombreDosis
    private LocalDate fecha; // mapped to fechaAplicacion
    private LocalDate proxima; // mapped to fechaProxAplicacion
    private BigDecimal peso; // mapped to pesoAplicacion
}
