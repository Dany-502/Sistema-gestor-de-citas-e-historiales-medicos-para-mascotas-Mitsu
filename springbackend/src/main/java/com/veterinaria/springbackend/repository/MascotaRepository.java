package com.veterinaria.springbackend.repository;

import com.veterinaria.springbackend.entity.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MascotaRepository extends JpaRepository<Mascota, String> {

    List<Mascota> findByClienteCorreoElectronico(String correoElectronico);

    List<Mascota> findByClienteIdCliente(Integer idCliente);

    Optional<Mascota> findByIdMascotaAndClienteCorreoElectronico(String idMascota, String correoElectronico);
}
