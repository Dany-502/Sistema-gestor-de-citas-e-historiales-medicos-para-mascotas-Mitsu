package com.veterinaria.springbackend.repository;

import com.veterinaria.springbackend.entity.Cita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CitaRepository extends JpaRepository<Cita, Integer> {
    List<Cita> findByMascotaClienteIdClienteOrderByFechaHoraInicioDesc(Integer idCliente);
    List<Cita> findByFechaHoraInicioBetweenAndEstadoNot(LocalDateTime desde, LocalDateTime hasta, String estado);
    List<Cita> findByVeterinarioCorreoElectronicoOrderByFechaHoraInicioDesc(String correoElectronico);

    @org.springframework.data.jpa.repository.Query("SELECT COUNT(c) FROM Cita c WHERE c.veterinario.idVeterinario = :idVeterinario AND c.estado != 'Cancelada' AND c.fechaHoraInicio < :fechaFin AND c.fechaHoraFin > :fechaInicio")
    long countCitasSuperpuestas(@org.springframework.data.repository.query.Param("idVeterinario") Integer idVeterinario, @org.springframework.data.repository.query.Param("fechaInicio") LocalDateTime fechaInicio, @org.springframework.data.repository.query.Param("fechaFin") LocalDateTime fechaFin);
}
