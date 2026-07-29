package com.veterinaria.springbackend.service;

import com.veterinaria.springbackend.dto.ServicioDTO;
import com.veterinaria.springbackend.entity.Servicio;
import com.veterinaria.springbackend.repository.ServicioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServicioService {

    private final ServicioRepository servicioRepository;

    public List<ServicioDTO> obtenerActivos() {
        return servicioRepository.findByActivoTrue().stream()
                .map(s -> new ServicioDTO(
                        s.getIdServicio(),
                        s.getIdTipoServicio(),
                        s.getNombreServicio(),
                        s.getDuracionTiempo(),
                        s.getPrecio(),
                        s.getActivo()))
                .collect(Collectors.toList());
    }
}
