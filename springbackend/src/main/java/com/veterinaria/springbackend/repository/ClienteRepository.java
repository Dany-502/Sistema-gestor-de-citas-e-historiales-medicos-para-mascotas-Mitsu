package com.veterinaria.springbackend.repository;

import com.veterinaria.springbackend.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    boolean existsByCorreoElectronico(String correoElectronico);

    Optional<Cliente> findByCorreoElectronico(String correoElectronico);
}