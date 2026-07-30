package com.veterinaria.springbackend.repository;

import com.veterinaria.springbackend.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    boolean existsByCorreoElectronico(String correoElectronico);

    Optional<Cliente> findByCorreoElectronico(String correoElectronico);

    @Query("SELECT DISTINCT c.mascota.cliente FROM Cita c WHERE c.veterinario.correoElectronico = :correo")
    List<Cliente> findClientesByVeterinario(@Param("correo") String correo);
}