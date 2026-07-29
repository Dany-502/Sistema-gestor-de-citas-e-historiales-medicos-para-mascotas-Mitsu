import React from 'react';
import './TarjetasKpiEstilos.css';

const TarjetasKpi = ({ kpis, cargandoKpis }) => {
    return (
        <div className="kpi-grid">
            <div className="kpi-card">
                <h3 className="kpi-titulo">Citas de hoy</h3>
                {cargandoKpis ? (
                    <div className="esqueleto-kpi"></div>
                ) : (
                    <p className="kpi-valor">{kpis.citasDeHoy}</p>
                )}
            </div>
            <div className="kpi-card destacado">
                <h3 className="kpi-titulo">Por confirmar</h3>
                {cargandoKpis ? (
                    <div className="esqueleto-kpi"></div>
                ) : (
                    <p className="kpi-valor">{kpis.citasPorConfirmar}</p>
                )}
            </div>
            <div className="kpi-card canceladas">
                <h3 className="kpi-titulo">Canceladas</h3>
                {cargandoKpis ? (
                    <div className="esqueleto-kpi"></div>
                ) : (
                    <p className="kpi-valor">{kpis.citasCanceladas}</p>
                )}
            </div>
        </div>
    );
};

export default TarjetasKpi;
