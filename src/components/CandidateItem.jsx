import { initialAcademic } from "../data/initialAcademic";

function CandidateItem({ candidate, onEdit, onDelete, onVote, showActions = true }) {
  const getAcademicName = (academicId) => {
      
      if (!academicId) return "Sin espacio";
      
      const academic = initialAcademic.find(a => a.id === academicId);
      return academic ? academic.nombre : "Espacio no válido";
    };
  return (
    <div className="candidate-item">
      <div>
        <h3>{candidate.nombre}</h3>
        <p>{candidate.propuesta}</p>
        <p>{getAcademicName(candidate.academicId)}</p>
        <span className="badge">Votos: {candidate.votos}</span>
      </div>

      {showActions && (
        <div className="actions">
          <button onClick={() => onVote(candidate.id)}>Votar</button>
          <button className="secondary" onClick={() => onEdit(candidate)}>
            Editar
          </button>
          <button className="danger" onClick={() => onDelete(candidate.id)}>
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default CandidateItem;