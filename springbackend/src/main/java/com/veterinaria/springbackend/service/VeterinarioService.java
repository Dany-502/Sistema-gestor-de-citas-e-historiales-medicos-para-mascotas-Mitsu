package com.veterinaria.springbackend.service;

import com.veterinaria.springbackend.dto.HorarioDTO;
import com.veterinaria.springbackend.dto.VeterinarioDTO;
import com.veterinaria.springbackend.entity.HorarioVeterinario;
import com.veterinaria.springbackend.entity.Veterinario;
import com.veterinaria.springbackend.repository.VeterinarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VeterinarioService {

    private final VeterinarioRepository veterinarioRepository;

    public List<VeterinarioDTO> obtenerTodos() {
        return veterinarioRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    private VeterinarioDTO convertirADTO(Veterinario v) {
        List<HorarioDTO> horarios = v.getHorarios().stream()
                .filter(h -> Boolean.TRUE.equals(h.getActivo()))
                .map(this::convertirHorarioADTO)
                .collect(Collectors.toList());

        return new VeterinarioDTO(
                v.getIdVeterinario(),
                v.getNombre(),
                v.getApPaterno(),
                v.getApMaterno(),
                v.getEspecialidad(),
                v.getCedula(),
                v.getTelefono(),
                v.getCorreoElectronico(),
                v.getDireccion(),
                horarios
        );
    }

    private HorarioDTO convertirHorarioADTO(HorarioVeterinario h) {
        String diaNombre = switch (h.getDiaSemana()) {
            case 1 -> "Lunes";
            case 2 -> "Martes";
            case 3 -> "Miércoles";
            case 4 -> "Jueves";
            case 5 -> "Viernes";
            case 6 -> "Sábado";
            case 7 -> "Domingo";
            default -> "Día " + h.getDiaSemana();
        };

        return new HorarioDTO(
                h.getIdHorario(),
                diaNombre,
                h.getHoraInicio() != null ? h.getHoraInicio().toString() : "",
                h.getHoraFin() != null ? h.getHoraFin().toString() : ""
        );
    }
}
