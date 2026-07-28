package com.veterinaria.springbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClienteResponseDTO {

    private Integer idCliente;
    private String nombre;
    private String apPaterno;
    private String apMaterno;
    private String nombreCompleto;
    private String direccion;
    private String telefono;
    private String correoElectronico;
}
