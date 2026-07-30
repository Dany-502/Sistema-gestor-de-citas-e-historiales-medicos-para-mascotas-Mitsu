package com.veterinaria.springbackend.repository;

import com.veterinaria.springbackend.entity.HistorialClinico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistorialClinicoRepository extends JpaRepository<HistorialClinico, Integer> {
    List<HistorialClinico> findByMascotaIdMascotaOrderByCitaFechaHoraInicioDesc(String idMascota);
}
