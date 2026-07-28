package com.veterinaria.springbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "VETERINARIO")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Veterinario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Veterinario")
    private Integer idVeterinario;

    @Column(name = "Nombre", nullable = false, length = 50)
    private String nombre;

    @Column(name = "ApPaterno", nullable = false, length = 50)
    private String apPaterno;

    @Column(name = "ApMaterno", nullable = false, length = 50)
    private String apMaterno;

    @Column(name = "Direccion", length = 150)
    private String direccion;

    @Column(name = "Cedula", length = 50)
    private String cedula;

    @Column(name = "Especialidad", length = 100)
    private String especialidad;

    @Column(name = "Telefono", length = 15)
    private String telefono;

    @Column(name = "Correo_Electronico", unique = true, length = 100)
    private String correoElectronico;

    @Column(name = "Contrasena", nullable = false)
    private String contrasena;

    @OneToMany(mappedBy = "veterinario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<HorarioVeterinario> horarios = new ArrayList<>();
}
