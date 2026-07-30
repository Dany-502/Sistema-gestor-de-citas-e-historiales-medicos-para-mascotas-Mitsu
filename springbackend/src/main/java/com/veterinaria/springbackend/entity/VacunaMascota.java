package com.veterinaria.springbackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "VACUNAS_MASCOTA")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VacunaMascota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_aplicacion")
    private Integer idAplicacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_mascota")
    private Mascota mascota;

    @Column(name = "nombre_dosis", nullable = false)
    private String nombreDosis;

    @Column(name = "fecha_aplicacion", nullable = false)
    private LocalDate fechaAplicacion;

    @Column(name = "fecha_prox_aplicacion")
    private LocalDate fechaProxAplicacion;

    @Column(name = "peso_aplicacion")
    private BigDecimal pesoAplicacion;
}
