import React from 'react';

export default function Inicio({ cerrarSesion }) {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            padding: '20px'
        }}>
            <div style={{
                background: '#ffffff',
                padding: '40px 60px',
                borderRadius: '20px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
                maxWidth: '500px',
                width: '100%'
            }}>
                <h1 style={{ color: '#0284c7', fontSize: '2.5rem', marginBottom: '10px' }}>
                    ¡Hola Mundo!
                </h1>
                <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.6', marginBottom: '30px' }}>
                    Has iniciado sesión exitosamente.
                </p>
                <button
                    onClick={cerrarSesion}
                    style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        padding: '12px 28px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease, transform 0.1s ease',
                        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}
