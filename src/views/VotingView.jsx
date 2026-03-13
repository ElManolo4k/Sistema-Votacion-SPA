import { initialAcademic } from "../data/initialAcademic";
import { useMemo } from "react";

function VotingView({ candidates, onVote }) {
  const totalVotos = candidates.reduce((acc, candidate) => acc + candidate.votos, 0);
  const maxVotos = candidates.length > 0 ? Math.max(...candidates.map((c) => c.votos)) : 0;
  
  const getAcademicName = (academicId) => {
    if (!academicId) return "Sin espacio";
    const academic = initialAcademic.find(a => a.id === academicId);
    return academic ? academic.nombre : "Espacio no válido";
  };

  // Agrupar candidatos por espacio académico
  const candidatesByAcademic = useMemo(() => {
    // Crear un mapa de espacios académicos con sus candidatos
    const academicMap = initialAcademic.map(academic => ({
      ...academic,
      candidates: candidates.filter(c => c.academicId === academic.id)
    }));
    
    // Filtrar solo espacios que tienen candidatos
    return academicMap.filter(academic => academic.candidates.length > 0);
  }, [candidates]);

  // Calcular votos por espacio
  const votesByAcademic = useMemo(() => {
    return candidatesByAcademic.map(academic => ({
      ...academic,
      totalVotos: academic.candidates.reduce((sum, c) => sum + c.votos, 0)
    }));
  }, [candidatesByAcademic]);

  return (
    <section className="view">
      <section className="card">
        <h2>Panel de votación</h2>
        <p className="muted">
          Selecciona un candidato para registrar un voto de forma visual.
        </p>

        {candidates.length === 0 ? (
          <p className="muted">No hay candidatos disponibles para votar.</p>
        ) : (
          <div className="voting-academic-sections">
            {votesByAcademic.map((academic) => (
              <section key={academic.id} className="academic-voting-section">
                <div className="academic-section-header">
                  <h3>{academic.nombre}</h3>
                  <div className="academic-section-stats">
                    <span className="badge">
                      {academic.candidates.length} candidatos
                    </span>
                    <span className="badge badge-primary">
                      {academic.totalVotos} votos totales
                    </span>
                  </div>
                </div>

                <div className="voting-cards academic-cards">
                  {academic.candidates.map((candidate) => {
                    const porcentaje =
                      totalVotos > 0 ? ((candidate.votos / totalVotos) * 100).toFixed(1) : "0.0";

                    const inicial = candidate.nombre?.trim()?.charAt(0)?.toUpperCase() || "?";
                    const isLeader = candidate.votos === maxVotos && maxVotos > 0;

                    return (
                      <article
                        className={`vote-card ${isLeader ? "leader-card" : ""}`}
                        key={candidate.id}
                      >
                        <div className="vote-card-header">
                          <div className="vote-card-profile">
                            <div className="vote-avatar">{inicial}</div>

                            <div>
                              <h3>{candidate.nombre}</h3>
                              {isLeader ? (
                                <span className="leader-badge">Lidera la votación</span>
                              ) : (
                                <span className="sub-badge">Candidato</span>
                              )}
                            </div>
                          </div>

                          <span className="badge">Votos: {candidate.votos}</span>
                        </div>

                        <p className="vote-card-text">{candidate.propuesta}</p>

                        <p className="vote-card-text">
                          <small>Espacio Académico: {academic.nombre}</small>
                        </p>

                        <div className="vote-stats">
                          <div className="vote-stats-row">
                            <span>Porcentaje actual</span>
                            <strong>{porcentaje}%</strong>
                          </div>

                          <div className="progress">
                            <div
                              className="progress-bar"
                              style={{ width: `${porcentaje}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="vote-card-footer">
                          <button onClick={() => onVote(candidate.id)}>
                            Votar por {candidate.nombre.split(' ')[0]}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default VotingView;