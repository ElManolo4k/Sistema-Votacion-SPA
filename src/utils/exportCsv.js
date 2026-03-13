export function exportCandidatesToCsv(candidates) {
  const headers = ["id", "nombre", "propuesta", "votos", "academicId"];

  const rows = candidates.map((candidate) => [
    candidate.id,
    `"${String(candidate.nombre).replaceAll('"', '""')}"`,
    `"${String(candidate.propuesta).replaceAll('"', '""')}"`,
    candidate.votos,
    candidate.academicId
  ]);

  const csvContent =
    "\uFEFF" + // ← BOM UTF-8 para que Excel reconozca acentos
    [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "candidatos_fullstack.csv";
  a.click();

  URL.revokeObjectURL(url);
}