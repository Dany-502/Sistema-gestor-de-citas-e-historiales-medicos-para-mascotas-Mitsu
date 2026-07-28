package com.veterinaria.springbackend.config;

import com.veterinaria.springbackend.entity.Cliente;
import com.veterinaria.springbackend.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        log.info("Verificando contraseñas de usuarios semilla...");

        List<Cliente> clientes = clienteRepository.findAll();
        for (Cliente cliente : clientes) {
            // Solo ajustar la contraseña si es uno de los usuarios semilla iniciales (ID <= 12) y no hace match con 123456
            if (cliente.getIdCliente() != null && cliente.getIdCliente() <= 12) {
                if (!passwordEncoder.matches("123456", cliente.getContrasena())) {
                    cliente.setContrasena(passwordEncoder.encode("123456"));
                    clienteRepository.save(cliente);
                }
            }
        }
        log.info("Contraseñas de semillas iniciales verificadas correctamente.");
    }
}
