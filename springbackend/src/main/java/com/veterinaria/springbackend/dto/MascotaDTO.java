package com.veterinaria.springbackend.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
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
public class MascotaDTO {

    @JsonProperty("id_Mascota")
    @JsonAlias({"idMascota", "id"})
    private String idMascota;

    @JsonProperty("NombreMascota")
    @JsonAlias({"nombreMascota", "nombre"})
    private String nombreMascota;

    @JsonProperty("Especie")
    @JsonAlias({"especie"})
    private String especie;

    @JsonProperty("Raza")
    @JsonAlias({"raza"})
    private String raza;

    @JsonProperty("FechaNacimiento")
    @JsonAlias({"fechaNacimiento"})
    private LocalDate fechaNacimiento;

    @JsonProperty("Sexo")
    @JsonAlias({"sexo"})
    private String sexo;

    @JsonProperty("Color")
    @JsonAlias({"color"})
    private String color;

    @JsonProperty("Peso")
    @JsonAlias({"peso"})
    private BigDecimal peso;

    @JsonProperty("Alergias")
    @JsonAlias({"alergias"})
    private String alergias;

    @JsonProperty("descripcion")
    @JsonAlias({"informacionAdicional"})
    private String descripcion;

    @JsonProperty("informacionAdicional")
    @JsonAlias({"descripcion"})
    private String informacionAdicional;

    @JsonProperty("adultoResponsable")
    private String adultoResponsable;

    @JsonProperty("estado")
    private String estado;

    @JsonProperty("fotoUrl")
    @JsonAlias({"imagen", "foto"})
    private String fotoUrl;
}
