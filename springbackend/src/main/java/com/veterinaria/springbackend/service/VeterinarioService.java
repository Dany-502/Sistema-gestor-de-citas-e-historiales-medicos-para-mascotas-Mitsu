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
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    public List<VeterinarioDTO> obtenerTodos() {
        return veterinarioRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public VeterinarioDTO registrarVeterinario(VeterinarioDTO dto) {
        if (veterinarioRepository.existsByCorreoElectronico(dto.getCorreoElectronico())) {
            throw new RuntimeException("Ya existe un veterinario registrado con este correo: " + dto.getCorreoElectronico());
        }

        Veterinario v = new Veterinario();
        v.setNombre(dto.getNombre());
        v.setApPaterno(dto.getApPaterno());
        v.setApMaterno(dto.getApMaterno());
        v.setEspecialidad(dto.getEspecialidad());
        v.setCedula(dto.getCedula());
        v.setTelefono(dto.getTelefono());
        v.setCorreoElectronico(dto.getCorreoElectronico());
        v.setDireccion(dto.getDireccion());
        
        String passwordToUse = (dto.getContrasena() != null && !dto.getContrasena().trim().isEmpty()) 
                ? dto.getContrasena() 
                : "123456";
        v.setContrasena(passwordEncoder.encode(passwordToUse));

        Veterinario guardado = veterinarioRepository.save(v);
        return convertirADTO(guardado);
    }

    public VeterinarioDTO actualizarVeterinario(Integer id, VeterinarioDTO dto) {
        Veterinario v = veterinarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veterinario no encontrado"));
        
        v.setNombre(dto.getNombre());
        v.setApPaterno(dto.getApPaterno());
        v.setApMaterno(dto.getApMaterno());
        v.setEspecialidad(dto.getEspecialidad());
        v.setCedula(dto.getCedula());
        v.setTelefono(dto.getTelefono());
        v.setCorreoElectronico(dto.getCorreoElectronico());
        v.setDireccion(dto.getDireccion());
        
        if (dto.getContrasena() != null && !dto.getContrasena().trim().isEmpty()) {
            v.setContrasena(passwordEncoder.encode(dto.getContrasena()));
        }

        // We can also update horarios here if needed, but for now we update basic profile
        Veterinario guardado = veterinarioRepository.save(v);
        return convertirADTO(guardado);
    }

    public void eliminarVeterinario(Integer id) {
        veterinarioRepository.deleteById(id);
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
                null, // No enviar la contraseña al cliente
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
