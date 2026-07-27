package com.veterinaria.springbackend.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Llave secreta para firmar los tokens (en un proyecto real, esto va en el
    // application.properties)
    private static final Key LLAVE_SECRETA = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // El token durará 24 horas (en milisegundos)
    private static final long TIEMPO_EXPIRACION = 86400000;

    // Método para crear el token usando el correo del usuario
    public String generarToken(String correo) {
        return Jwts.builder()
                .setSubject(correo)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TIEMPO_EXPIRACION))
                .signWith(LLAVE_SECRETA)
                .compact();
    }

    // Método para extraer el correo que viene dentro del token
    public String extraerCorreo(String token) {
        return extraerTodosLosClaims(token).getSubject();
    }

    // Método para verificar si el token ya caducó
    public boolean tokenExpirado(String token) {
        return extraerTodosLosClaims(token).getExpiration().before(new Date());
    }

    // Método para validar que el token pertenece al usuario y no está vencido
    public boolean validarToken(String token, String correo) {
        final String correoDelToken = extraerCorreo(token);
        return (correoDelToken.equals(correo) && !tokenExpirado(token));
    }

    // Método interno para descifrar el token con nuestra llave secreta
    private Claims extraerTodosLosClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(LLAVE_SECRETA)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}