package com.veterinaria.springbackend.repository;

import com.veterinaria.springbackend.entity.HorarioVeterinario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HorarioVeterinarioRepository extends JpaRepository<HorarioVeterinario, Integer> {
    List<HorarioVeterinario> findByVeterinarioIdVeterinario(Integer idVeterinario);
}
