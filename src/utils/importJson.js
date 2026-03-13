export function importCandidatesFromJson(file, onSuccess, onError) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);

      if (!parsed.candidates || !Array.isArray(parsed.candidates)) {
        throw new Error("Estructura inválida");
      }

      const normalized = parsed.candidates.map((candidate, index) => ({
        id: candidate.id ?? Date.now() + index,
        nombre: String(candidate.nombre ?? "").trim(),
        propuesta: String(candidate.propuesta ?? "").trim(),
        votos: Number(candidate.votos ?? 0),
        academicId: Number(candidate.academicId ?? 0)
      }));

      onSuccess(normalized);
    } catch (error) {
      onError(error);
    }
  };

  reader.readAsText(file);
}