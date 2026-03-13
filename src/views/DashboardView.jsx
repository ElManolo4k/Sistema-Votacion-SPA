import SummaryCards from "../components/SummaryCards";
import { initialAcademic } from "../data/initialAcademic";
import { useMemo } from "react";

function DashboardView({ candidates }) {
  
  const getAcademicName = (academicId) => {
    if (!academicId) return "Sin espacio";
    const academic = initialAcademic.find(a => a.id === academicId);
    return academic ? academic.nombre : "Espacio no válido";
  };

  const totalVotos = candidates.reduce((acc, candidate) => acc + candidate.votos, 0);

  const topCandidates = [...candidates]
    .sort((a, b) => b.votos - a.votos)
    .slice(0, 3);

  const leader = topCandidates.length > 0 ? topCandidates[0] : null;

  // Agrupar candidatos por espacio académico
  const candidatesByAcademic = useMemo(() => {
    return initialAcademic.map(academic => ({
      ...academic,
      candidates: candidates.filter(c => c.academicId === academic.id),
      totalVotos: candidates
        .filter(c => c.academicId === academic.id)
        .reduce((sum, c) => sum + c.votos, 0)
    }));
  }, [candidates]);

  return (
    <section className="view">
      <section className="card">
        <h2>Dashboard</h2>
        <p className="muted">
          Vista general del proceso de votación para representante de Cursos.
        </p>
      </section>

      <SummaryCards candidates={candidates} />

      <div className="dashboard-grid">
        <section className="card">
          <h2>Resumen general</h2>
          <div className="dashboard-info">
            <div className="dashboard-info-item">
              <span className="dashboard-label">Total de candidatos</span>
              <strong>{candidates.length}</strong>
            </div>
            <div className="dashboard-info-item">
              <span className="dashboard-label">Total de votos</span>
              <strong>{totalVotos}</strong>
            </div>
            <div className="dashboard-info-item">
              <span className="dashboard-label">Candidato líder</span>
              <strong>{leader ? leader.nombre : "Sin datos"}</strong>
            </div>
          </div>
        </section>

        <section className="card">
          <h2>Top 3 candidatos</h2>

          {topCandidates.length === 0 ? (
            <p className="muted">Aún no hay candidatos registrados.</p>
          ) : (
            <div className="top-list">
              {topCandidates.map((candidate, index) => {
                const porcentaje =
                  totalVotos > 0 ? ((candidate.votos / totalVotos) * 100).toFixed(1) : "0.0";

                const inicial = candidate.nombre?.trim()?.charAt(0)?.toUpperCase() || "?";

                return (
                  <article className="top-card" key={candidate.id}>
                    <div className="top-card-header">
                      <div className="top-profile">
                        <div className="top-avatar">{inicial}</div>
                        <div>
                          <h3>{candidate.nombre}</h3>
                          <span className="top-position">
                            {index === 0 ? "Primer lugar" : index === 1 ? "Segundo lugar" : "Tercer lugar"}
                          </span>
                        </div>
                      </div>
                      <span className="badge">{candidate.votos} votos</span>
                    </div>

                    <p className="top-text">{candidate.propuesta}</p>
                    
                    <div className="academic-badge">
                      <span className="badge badge-academic">
                        {getAcademicName(candidate.academicId)}
                      </span>
                    </div>

                    <div className="top-progress-block">
                      <div className="vote-stats-row">
                        <span>Participación</span>
                        <strong>{porcentaje}%</strong>
                      </div>
                      <div className="progress">
                        <div className="progress-bar" style={{ width: `${porcentaje}%` }}></div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* NUEVA SECCIÓN: Espacios académicos con sus candidatos */}
      <section className="card" style={{ marginTop: '20px' }}>
        <h2>Espacios académicos</h2>
        <p className="muted">
          Candidatos organizados por espacio académico
        </p>

        <div className="academic-spaces-grid">
          {candidatesByAcademic.map(academic => (
            <div key={academic.id} className="academic-space-card">
              <div className="academic-space-header">
                <h3>{academic.nombre}</h3>
                <div className="academic-stats">
                  <span className="badge">
                    {academic.candidates.length} candidatos
                  </span>
                  <span className="badge badge-primary">
                    {academic.totalVotos} votos
                  </span>
                </div>
              </div>

              {academic.candidates.length === 0 ? (
                <p className="muted" style={{ padding: '15px', textAlign: 'center' }}>
                  No hay candidatos en este espacio
                </p>
              ) : (
                <div className="academic-candidates-list">
                  {academic.candidates.map(candidate => (
                    <div key={candidate.id} className="academic-candidate-item">
                      <div className="candidate-info">
                        <span className="candidate-name">{candidate.nombre}</span>
                        <span className="candidate-votes">{candidate.votos} votos</span>
                      </div>
                      <div className="candidate-proposal">
                        {candidate.propuesta.substring(0, 60)}
                        {candidate.propuesta.length > 60 ? '...' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default DashboardView;