package com.veterinaria.springbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VeterinarioDTO {
    private Integer idVeterinario;
    private String nombre;
    private String apPaterno;
    private String apMaterno;
    private String especialidad;
    private String cedula;
    private String telefono;
    private String correoElectronico;
    private String direccion;
    private String contrasena;
    private List<HorarioDTO> horarios;
}
