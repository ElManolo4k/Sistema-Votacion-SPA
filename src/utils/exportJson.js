export function exportCandidatesToJson(candidates) {
  const data = {
    exportedAt: new Date().toISOString(),
    candidates,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "candidatos_fullstack.json";
  a.click();
  URL.revokeObjectURL(url);
}