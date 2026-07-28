package com.veterinaria.springbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "MASCOTA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Mascota {

    @Id
    @Column(name = "id_Mascota", length = 18)
    private String idMascota;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cliente", nullable = false)
    private Cliente cliente;

    @Column(name = "NombreMascota", nullable = false, length = 50)
    private String nombreMascota;

    @Column(name = "Especie", length = 50)
    private String especie;

    @Column(name = "Raza", length = 50)
    private String raza;

    @Column(name = "FechaNacimiento")
    private LocalDate fechaNacimiento;

    @Column(name = "Sexo", length = 15)
    private String sexo;

    @Column(name = "Color", length = 30)
    private String color;

    @Column(name = "Peso", precision = 5, scale = 2)
    private BigDecimal peso;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "Alergias", columnDefinition = "TEXT")
    private String alergias;

    @Column(name = "imagen", columnDefinition = "LONGTEXT")
    private String imagen;

    @Column(name = "estado", length = 30)
    private String estado;
}
