package com.veterinaria.springbackend.repository;

import com.veterinaria.springbackend.entity.VacunaMascota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VacunaMascotaRepository extends JpaRepository<VacunaMascota, Integer> {
    List<VacunaMascota> findByMascotaIdMascotaOrderByFechaAplicacionDesc(String idMascota);
}
