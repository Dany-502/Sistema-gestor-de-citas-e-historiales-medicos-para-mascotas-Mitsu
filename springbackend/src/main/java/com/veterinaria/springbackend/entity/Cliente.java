package com.veterinaria.springbackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "cliente")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Cliente")
    private Integer idCliente;

    @Column(name = "Nombre", nullable = false, length = 50)
    private String nombre;

    @Column(name = "ApPaterno", nullable = false, length = 50)
    private String apPaterno;

    @Column(name = "ApMaterno", nullable = false, length = 50)
    private String apMaterno;

    @Column(name = "Direccion", nullable = false, length = 150)
    private String direccion;

    @Column(name = "Telefono", nullable = false, length = 15)
    private String telefono;

    @Column(name = "Correo_Electronico", nullable = false, unique = true, length = 100)
    private String correoElectronico;

    @Column(name = "Contrasena", nullable = false)
    private String contrasena;
}