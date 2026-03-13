import { useState } from "react";
import { initialAcademic } from "../data/initialAcademic";

function CandidateForm({ onSave, editingCandidate, onCancelEdit, showToast }) {


  const [nombre, setNombre] = useState(editingCandidate?.nombre ?? "");
  const [propuesta, setPropuesta] = useState(editingCandidate?.propuesta ?? "");
  const [academicId, setAcademicId] = useState(editingCandidate?.academicId ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !propuesta.trim() || !academicId) {
      showToast("error", "Campos obligatorios", "Todos los campos del formulario son obligatorios.");
      return;
    }

    onSave({
      nombre: nombre.trim(),
      propuesta: propuesta.trim(),
      academicId: Number(academicId)
    });

    if (!editingCandidate) {
      setNombre("");
      setPropuesta("");
      setAcademicId("");
    }
  };

  return (
    <section className="card">
      <h2>{editingCandidate ? "Editar candidato" : "Registrar candidato"}</h2>

      <form onSubmit={handleSubmit} className="form">
        <label>
          Nombre del candidato
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Ana Gómez"
          />
        </label>

        <label>
          Propuesta
          <textarea
            value={propuesta}
            onChange={(e) => setPropuesta(e.target.value)}
            placeholder="Describe la propuesta del candidato"
            rows="4"
          />
        </label>

        <label>Espacio Academico
          <select value={academicId} onChange={(e) => setAcademicId(e.target.value)} className="">
            <option value="">Selecciona un espacio académico</option>
            {initialAcademic.map((academic) => (
              <option key={academic.id} value={academic.id}>
                {academic.nombre}
              </option>
            ))}
          </select>
        </label>

        <div className="actions">
          <button type="submit">
            {editingCandidate ? "Actualizar" : "Guardar"}
          </button>

          {editingCandidate && (
            <button type="button" className="secondary" onClick={onCancelEdit}>
              Cancelar edición
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default CandidateForm;