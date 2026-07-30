package com.veterinaria.springbackend.repository;

import com.veterinaria.springbackend.entity.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

@Repository
public interface MascotaRepository extends JpaRepository<Mascota, String> {

    List<Mascota> findByClienteCorreoElectronico(String correoElectronico);

    List<Mascota> findByClienteIdCliente(Integer idCliente);

    Optional<Mascota> findByIdMascotaAndClienteCorreoElectronico(String idMascota, String correoElectronico);

    @Query("SELECT DISTINCT c.mascota FROM Cita c WHERE c.veterinario.correoElectronico = :correo")
    List<Mascota> findMascotasByVeterinario(@Param("correo") String correo);
}
