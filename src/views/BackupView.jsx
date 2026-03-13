import { exportCandidatesToCsv } from "../utils/exportCsv";
import { exportCandidatesToJson } from "../utils/exportJson";
import { importCandidatesFromJson } from "../utils/importJson";
import { clearCandidates } from "../utils/localStorage";
import { initialCandidates } from "../data/initialCandidates";

function BackupView({
  candidates,
  onImportCandidates,
  onResetCandidates,
  showToast,
}) {
  const handleImport = (file) => {
    importCandidatesFromJson(
      file,
      (parsedCandidates) => {
        onImportCandidates(parsedCandidates);
      },
      () => {
        showToast("error", "Error de importación", "No se pudo importar el archivo JSON.");
      }
    );
  };

  const handleReset = () => {
    const ok = window.confirm(
      "¿Deseas restablecer los candidatos por defecto y limpiar los datos guardados?"
    );
    if (!ok) return;

    clearCandidates();
    onResetCandidates(initialCandidates);
  };

  const handleExportCsv = () => {
    exportCandidatesToCsv(candidates);
    showToast("success", "CSV exportado", "El archivo CSV fue generado correctamente.");
  };

  const handleExportJson = () => {
    exportCandidatesToJson(candidates);
    showToast("success", "JSON exportado", "El archivo JSON fue generado correctamente.");
  };

  return (
    <section className="view">
      <section className="card">
        <h2>Backup y exportación</h2>
        <p className="muted">
          Exporta la información a CSV o JSON, importa un respaldo en JSON o restablece los datos.
        </p>

        <div className="backup-grid">
          <button onClick={handleExportCsv}>Exportar CSV</button>

          <button onClick={handleExportJson}>Exportar JSON</button>

          <label className="file-label">
            Importar JSON
            <input
              type="file"
              accept="application/json"
              onChange={(e) => handleImport(e.target.files?.[0])}
            />
          </label>

          <button className="danger" onClick={handleReset}>
            Reiniciar datos
          </button>
        </div>
      </section>
    </section>
  );
}

export default BackupView;