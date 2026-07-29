package com.veterinaria.springbackend.service;

import com.veterinaria.springbackend.entity.Cita;
import com.veterinaria.springbackend.entity.Cliente;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${email.enabled:true}")
    private boolean enabled;

    @Value("${spring.mail.username:notificaciones.mitsu@gmail.com}")
    private String remitente;

    private final DateTimeFormatter formateadorFecha = DateTimeFormatter.ofPattern("EEEE d 'de' MMMM 'de' yyyy",
            new Locale("es", "ES"));
    private final DateTimeFormatter formateadorHora = DateTimeFormatter.ofPattern("hh:mm a", new Locale("es", "ES"));

    @Async
    public void enviarConfirmacionCita(Cita cita, Cliente cliente) {
        if (!enabled) {
            log.info("Envío de correos desactivado por configuración (email.enabled=false).");
            return;
        }

        if (cliente == null || cliente.getCorreoElectronico() == null
                || cliente.getCorreoElectronico().trim().isEmpty()) {
            log.warn("No se pudo enviar el correo de confirmación: El cliente no tiene correo electrónico registrado.");
            return;
        }

        String destinatario = cliente.getCorreoElectronico();
        String asunto = " Confirmación de Cita Médica - Clínica Veterinaria Mitsu";
        String htmlContent = construirHtmlConfirmacionCita(cita, cliente);

        enviarCorreoHtml(destinatario, asunto, htmlContent);
    }

    @Async
    public void enviarRecordatorio24Horas(Cita cita, Cliente cliente) {
        if (!enabled) {
            return;
        }

        if (cliente == null || cliente.getCorreoElectronico() == null
                || cliente.getCorreoElectronico().trim().isEmpty()) {
            return;
        }

        String destinatario = cliente.getCorreoElectronico();
        String asunto = "Recordatorio: Cita Mañana en Clínica Veterinaria Mitsu";
        String htmlContent = construirHtmlRecordatorioCita(cita, cliente);

        enviarCorreoHtml(destinatario, asunto, htmlContent);
    }

    private void enviarCorreoHtml(String destinatario, String asunto, String htmlContent) {
        try {
            MimeMessage mensaje = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mensaje, true, "UTF-8");

            helper.setFrom(remitente, "Clínica Veterinaria Mitsu");
            helper.setTo(destinatario);
            helper.setSubject(asunto);
            helper.setText(htmlContent, true);

            mailSender.send(mensaje);
            log.info("Correo electrónico enviado exitosamente a {} con asunto: '{}'", destinatario, asunto);
        } catch (Exception e) {
            log.error("Error al enviar correo electrónico a {}: {}", destinatario, e.getMessage());
        }
    }

    private String construirHtmlConfirmacionCita(Cita cita, Cliente cliente) {
        String nombreCliente = cliente.getNombre() != null ? cliente.getNombre() : "Estimado(a) Cliente";
        String nombreMascota = (cita.getMascota() != null && cita.getMascota().getNombreMascota() != null)
                ? cita.getMascota().getNombreMascota()
                : "tu mascota";
        String nombreServicio = (cita.getServicio() != null && cita.getServicio().getNombreServicio() != null)
                ? cita.getServicio().getNombreServicio()
                : "Consulta Médica";
        String nombreVet = (cita.getVeterinario() != null && cita.getVeterinario().getNombre() != null)
                ? "Dr(a). " + cita.getVeterinario().getNombre() + " " + cita.getVeterinario().getApPaterno()
                : "Personal Médico Mitsu";

        String fechaFormat = cita.getFechaHoraInicio() != null ? cita.getFechaHoraInicio().format(formateadorFecha)
                : "Fecha por confirmar";
        String horaFormat = cita.getFechaHoraInicio() != null ? cita.getFechaHoraInicio().format(formateadorHora)
                : "Hora por confirmar";

        return """
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 20px; color: #333; }
                        .container { max-width: 600px; background-color: #ffffff; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
                        .header { background: linear-gradient(135deg, #14b8a6 0%%, #0d9488 100%%); color: white; text-align: center; padding: 30px 20px; }
                        .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
                        .header p { margin: 5px 0 0 0; opacity: 0.9; font-size: 14px; }
                        .content { padding: 30px 25px; }
                        .greeting { font-size: 18px; font-weight: 600; color: #0f766e; margin-bottom: 15px; }
                        .card { background-color: #f8fafc; border-left: 4px solid #14b8a6; padding: 20px; border-radius: 6px; margin: 20px 0; }
                        .item { margin-bottom: 12px; display: flex; justify-content: space-between; font-size: 15px; }
                        .label { font-weight: 600; color: #64748b; }
                        .value { font-weight: 700; color: #1e293b; text-align: right; }
                        .footer { background-color: #f1f5f9; text-align: center; padding: 20px; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
                        .btn { display: inline-block; background-color: #14b8a6; color: white; text-decoration: none; padding: 12px 25px; border-radius: 25px; font-weight: 600; margin-top: 15px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🐾 Clínica Veterinaria Mitsu</h1>
                            <p>Confirmación de Cita Médica</p>
                        </div>
                        <div class="content">
                            <div class="greeting">¡Hola, %s! 👋</div>
                            <p>Nos alegra informarte que la cita médica para tu mascota ha sido agendada con éxito en nuestro sistema.</p>

                            <div class="card">
                                <div class="item"><span class="label">Mascota:</span> <span class="value"> %s</span></div>
                                <div class="item"><span class="label">Servicio:</span> <span class="value"> %s</span></div>
                                <div class="item"><span class="label">Veterinario:</span> <span class="value"> %s</span></div>
                                <div class="item"><span class="label">Fecha:</span> <span class="value"> %s</span></div>
                                <div class="item"><span class="label">Hora:</span> <span class="value"> %s</span></div>
                            </div>

                            <p style="font-size: 14px; color: #475569;">Por favor preséntate 10 minutos antes de la hora programada. Si necesitasvcancelar tu cita, puedes hacerlo desde tu cuenta en nuestro sitio web.</p>
                        </div>
                        <div class="footer">
                            <p> Clínica Veterinaria Mitsu</p>
                            <p>Si tienes alguna duda, contáctanos a nuestro equipo de atención médica.</p>
                        </div>
                    </div>
                </body>
                </html>
                """
                .formatted(nombreCliente, nombreMascota, nombreServicio, nombreVet, fechaFormat, horaFormat);
    }

    private String construirHtmlRecordatorioCita(Cita cita, Cliente cliente) {
        String nombreCliente = cliente.getNombre() != null ? cliente.getNombre() : "Estimado(a) Cliente";
        String nombreMascota = (cita.getMascota() != null && cita.getMascota().getNombreMascota() != null)
                ? cita.getMascota().getNombreMascota()
                : "tu mascota";
        String nombreServicio = (cita.getServicio() != null && cita.getServicio().getNombreServicio() != null)
                ? cita.getServicio().getNombreServicio()
                : "Consulta Médica";

        String fechaFormat = cita.getFechaHoraInicio() != null ? cita.getFechaHoraInicio().format(formateadorFecha)
                : "Mañana";
        String horaFormat = cita.getFechaHoraInicio() != null ? cita.getFechaHoraInicio().format(formateadorHora)
                : "Hora programada";

        return """
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 20px; color: #333; }
                        .container { max-width: 600px; background-color: #ffffff; margin: 0 auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
                        .header { background: linear-gradient(135deg, #f59e0b 0%%, #d97706 100%%); color: white; text-align: center; padding: 30px 20px; }
                        .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
                        .content { padding: 30px 25px; }
                        .greeting { font-size: 18px; font-weight: 600; color: #d97706; margin-bottom: 15px; }
                        .card { background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 6px; margin: 20px 0; }
                        .item { margin-bottom: 12px; display: flex; justify-content: space-between; font-size: 15px; }
                        .label { font-weight: 600; color: #78350f; }
                        .value { font-weight: 700; color: #1e293b; text-align: right; }
                        .footer { background-color: #f1f5f9; text-align: center; padding: 20px; font-size: 13px; color: #64748b; border-top: 1px solid #e2e8f0; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>⏰ Recordatorio de Cita Médica</h1>
                        </div>
                        <div class="content">
                            <div class="greeting">¡Hola, %s! 👋</div>
                            <p>Te recordamos que tienes una cita agendada para mañana en <strong>Clínica Veterinaria Mitsu</strong>.</p>

                            <div class="card">
                                <div class="item"><span class="label">Mascota:</span> <span class="value">🐶 %s</span></div>
                                <div class="item"><span class="label">Servicio:</span> <span class="value">🩺 %s</span></div>
                                <div class="item"><span class="label">Fecha:</span> <span class="value">📅 %s</span></div>
                                <div class="item"><span class="label">Hora:</span> <span class="value">⏰ %s</span></div>
                            </div>

                            <p style="font-size: 14px; color: #475569;">¡Te esperamos con gusto para cuidar la salud de tu mascota!</p>
                        </div>
                        <div class="footer">
                            <p>📍 Clínica Veterinaria Mitsu | Cuidando con amor a quienes más amas</p>
                        </div>
                    </div>
                </body>
                </html>
                """
                .formatted(nombreCliente, nombreMascota, nombreServicio, fechaFormat, horaFormat);
    }
}
