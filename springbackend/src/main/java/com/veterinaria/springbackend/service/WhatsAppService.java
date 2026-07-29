package com.veterinaria.springbackend.service;

import com.veterinaria.springbackend.entity.Cita;
import com.veterinaria.springbackend.entity.Cliente;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@Service
public class WhatsAppService {

    @Value("${meta.whatsapp.token:}")
    private String token;

    @Value("${meta.whatsapp.phone-number-id:}")
    private String phoneNumberId;

    @Value("${meta.whatsapp.version:v25.0}")
    private String apiVersion;

    @Value("${meta.whatsapp.enabled:true}")
    private boolean enabled;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Envía la plantilla predeterminada 'hello_world' aprobada por Meta.
     */
    @Async
    public void enviarPlantillaHelloWorld(String numeroDestino) {
        if (!enabled || token == null || token.trim().isEmpty() || phoneNumberId == null
                || phoneNumberId.trim().isEmpty()) {
            log.info("[SIMULACIÓN META PLANTILLA HELLO_WORLD] Para: {}", numeroDestino);
            return;
        }

        try {
            String destinoFormateado = formatearNumeroMeta(numeroDestino);
            String version = (apiVersion != null && !apiVersion.trim().isEmpty()) ? apiVersion.trim() : "v25.0";
            String url = String.format("https://graph.facebook.com/%s/%s/messages", version, phoneNumberId.trim());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(token.trim());

            String jsonBody = String.format("""
                    {
                        "messaging_product": "whatsapp",
                        "to": "%s",
                        "type": "template",
                        "template": {
                            "name": "hello_world",
                            "language": {
                                "code": "en_US"
                            }
                        }
                    }
                    """, destinoFormateado);

            HttpEntity<String> requestEntity = new HttpEntity<>(jsonBody, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                log.info("Plantilla hello_world de Meta enviada exitosamente a {}: {}", destinoFormateado,
                        response.getBody());
            } else {
                log.error("Error al enviar plantilla hello_world. Status: {} - Body: {}", response.getStatusCode(),
                        response.getBody());
            }
        } catch (Exception e) {
            log.error("Excepción al enviar plantilla hello_world a través de Meta API: {}", e.getMessage());
        }
    }

    @Async
    public void enviarNotificacionNuevaCita(Cita cita, Cliente cliente) {
        if (!enabled)
            return;

        log.info("Procesando notificación de nueva cita ID: {}. Cliente: {}, Teléfono: '{}'",
                cita != null ? cita.getIdCita() : "null",
                cliente != null ? cliente.getNombre() : "null",
                cliente != null ? cliente.getTelefono() : "null");

        if (cliente != null && cliente.getTelefono() != null && !cliente.getTelefono().trim().isEmpty()) {
            log.info("Enviando plantilla 'hello_world' de Meta al crear la cita para el cliente {}",
                    cliente.getNombre());
            enviarPlantillaHelloWorld(cliente.getTelefono());
        } else {
            log.warn("No se envió WhatsApp porque el cliente no tiene un teléfono válido registrado.");
        }
    }

    @Async
    public void enviarNotificacionCancelacion(Cita cita, Cliente cliente) {
        if (!enabled)
            return;

        String fechaFormateada = cita.getFechaHoraInicio() != null
                ? cita.getFechaHoraInicio().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"))
                : "";

        String mensaje = String.format(
                "*Veterinaria Mitsu - Cancelación de Cita*\n\n" +
                        "Hola *%s*, te informamos que tu cita para *%s* programada para el *%s* ha sido cancelada.\n\n"
                        +
                        "Si deseas reagendar, puedes hacerlo desde nuestra aplicación web.",
                cliente.getNombre(),
                cita.getMascota() != null ? cita.getMascota().getNombreMascota() : "tu mascota",
                fechaFormateada);

        enviarMensajeMetaWhatsApp(cliente.getTelefono(), mensaje);
    }

    @Async
    public void enviarRecordatorio24Horas(Cita cita, Cliente cliente) {
        if (!enabled)
            return;

        if (cliente != null && cliente.getTelefono() != null) {
            // Para probar Meta iniciando la conversación usamos la plantilla aprobada
            enviarPlantillaHelloWorld(cliente.getTelefono());
        }
    }

    private void enviarMensajeMetaWhatsApp(String telefonoDestino, String cuerpoMensaje) {
        if (token == null || token.trim().isEmpty() || phoneNumberId == null || phoneNumberId.trim().isEmpty()) {
            log.info("[SIMULACIÓN META WHATSAPP] Mensaje para {}: \n{}", telefonoDestino, cuerpoMensaje);
            return;
        }

        try {
            String destinoFormateado = formatearNumeroMeta(telefonoDestino);
            String version = (apiVersion != null && !apiVersion.trim().isEmpty()) ? apiVersion.trim() : "v25.0";
            String url = String.format("https://graph.facebook.com/%s/%s/messages", version, phoneNumberId.trim());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(token.trim());

            Map<String, Object> body = new HashMap<>();
            body.put("messaging_product", "whatsapp");
            body.put("recipient_type", "individual");
            body.put("to", destinoFormateado);
            body.put("type", "text");

            Map<String, Object> textObj = new HashMap<>();
            textObj.put("preview_url", false);
            textObj.put("body", cuerpoMensaje);
            body.put("text", textObj);

            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                log.info("Mensaje de texto Meta WhatsApp enviado exitosamente a {}: {}", destinoFormateado,
                        response.getBody());
            } else {
                log.error("Error al enviar mensaje por Meta WhatsApp. Status: {} - Body: {}", response.getStatusCode(),
                        response.getBody());
            }
        } catch (Exception e) {
            log.error("Excepción al enviar mensaje de texto a través de Meta WhatsApp API: {}", e.getMessage());
        }
    }

    private String formatearNumeroMeta(String numero) {
        if (numero == null)
            return "";
        String limpio = numero.replaceAll("[^0-9]", "");
        if (limpio.startsWith("521") && limpio.length() == 13) {
            return "52" + limpio.substring(3);
        }
        if (limpio.startsWith("52") && limpio.length() == 12) {
            return limpio;
        }
        if (limpio.length() == 10) {
            return "52" + limpio;
        }
        return limpio;
    }
}
