import { useMemo, useState } from "react";
import CandidateList from "../components/CandidateList";
import { initialAcademic } from "../data/initialAcademic";

// Mapa para mostrar nombre del espacio en el resultado
const academicMap = initialAcademic.reduce((map, a) => {
  map[a.id] = a.nombre;
  return map;
}, {});

function CandidatesView({ candidates, onEdit, onDelete, onVote }) {
  const [query, setQuery] = useState("");
  const [academicFilter, setAcademicFilter] = useState("all");

  const filteredCandidates = useMemo(() => {
    const text = query.trim().toLowerCase();

    return candidates.filter((candidate) => {
      const matchesText = !text || 
        candidate.nombre.toLowerCase().includes(text) ||
        candidate.propuesta.toLowerCase().includes(text);
      
      const matchesAcademic = academicFilter === "all" || 
        candidate.academicId === parseInt(academicFilter);
      
      return matchesText && matchesAcademic;
    });
  }, [candidates, query, academicFilter]);

  return (
    <section className="view">
      <section className="card">
        <h2>Listado de candidatos</h2>
        <p className="muted">
          Administra candidatos, edítalos, elimínalos o registra votos manualmente.
        </p>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o propuesta"
            style={{ flex: 2 }}
          />
          
          <select
            value={academicFilter}
            onChange={(e) => setAcademicFilter(e.target.value)}
            style={{ flex: 1 }}
          >
            <option value="all">Todos los espacios</option>
            {initialAcademic.map(academic => (
              <option key={academic.id} value={academic.id}>
                {academic.nombre}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '10px', color: '#666' }}>
          Mostrando {filteredCandidates.length} de {candidates.length} candidatos
        </div>

        <CandidateList
          candidates={filteredCandidates}
          onEdit={onEdit}
          onDelete={onDelete}
          onVote={onVote}
        />
      </section>
    </section>
  );
}

export default CandidatesView;