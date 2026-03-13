function SummaryCards({ candidates }) {
  const totalCandidatos = candidates.length;
  const totalVotos = candidates.reduce((acc, item) => acc + item.votos, 0);

  const ganador =
    candidates.length > 0
      ? [...candidates].sort((a, b) => b.votos - a.votos)[0]
      : null;

  const promedio =
    totalCandidatos > 0 ? (totalVotos / totalCandidatos).toFixed(1) : "0.0";

  return (
    <div className="summary-grid">
      <div className="kpi-card">
        <div className="kpi-number">{totalCandidatos}</div>
        <div className="kpi-label">Candidatos registrados</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-number">{totalVotos}</div>
        <div className="kpi-label">Votos registrados</div>
      </div>

      <div className="kpi-card">
        <div className="kpi-number">{ganador ? ganador.votos : 0}</div>
        <div className="kpi-label">
          {ganador ? `Lidera: ${ganador.nombre}` : "Sin líder"}
        </div>
      </div>

      <div className="kpi-card">
        <div className="kpi-number">{promedio}</div>
        <div className="kpi-label">Promedio de votos</div>
      </div>
    </div>
  );
}

export default SummaryCards;