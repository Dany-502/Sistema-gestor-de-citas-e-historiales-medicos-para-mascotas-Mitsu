package com.veterinaria.springbackend.service;

import com.veterinaria.springbackend.entity.Cita;
import com.veterinaria.springbackend.entity.Cliente;
import com.veterinaria.springbackend.repository.CitaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class RecordatorioCitasTask {

    private final CitaRepository citaRepository;
    private final WhatsAppService whatsAppService;
    private final EmailService emailService;

    @Scheduled(cron = "0 0 * * * *")
    public void procesarRecordatorios24Horas() {
        log.info("Ejecutando tarea programada: Verificando citas para enviar recordatorio de 24 horas...");
        ejecutarProcesoRecordatorios();
    }

    public int ejecutarProcesoRecordatorios() {
        LocalDateTime ahora = LocalDateTime.now();
        LocalDateTime desde = ahora.plusHours(23).plusMinutes(30);
        LocalDateTime hasta = ahora.plusHours(24).plusMinutes(30);

        List<Cita> citasProximas = citaRepository.findByFechaHoraInicioBetweenAndEstadoNot(desde, hasta, "Cancelada");

        log.info("Citas encontradas para recordatorio 24h: {}", citasProximas.size());

        for (Cita cita : citasProximas) {
            try {
                Cliente cliente = cita.getMascota().getCliente();
                if (cliente != null) {
                    whatsAppService.enviarRecordatorio24Horas(cita, cliente);
                    emailService.enviarRecordatorio24Horas(cita, cliente);
                    log.info("Recordatorio enviado a cliente {} para la cita ID: {}", cliente.getNombre(),
                            cita.getIdCita());
                }
            } catch (Exception e) {
                log.error("Error al procesar recordatorio para cita ID {}: {}", cita.getIdCita(), e.getMessage());
            }
        }

        return citasProximas.size();
    }
}
