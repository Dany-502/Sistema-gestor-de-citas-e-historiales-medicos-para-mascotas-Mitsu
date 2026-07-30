package com.veterinaria.springbackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Entity
@Table(name = "HISTORIAL_CLINICO")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HistorialClinico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_historial")
    private Integer idHistorial;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_mascota")
    private Mascota mascota;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cita")
    private Cita cita;

    @Column(name = "descripcion_cita", columnDefinition = "TEXT")
    private String descripcionCita;

    @Column(name = "diagnostico", columnDefinition = "TEXT")
    private String diagnostico;
}
