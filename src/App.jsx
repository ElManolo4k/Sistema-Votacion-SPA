import { useEffect, useState } from "react";
import { initialCandidates } from "./data/initialCandidates";

import Topbar from "./components/Topbar";
import Toast from "./components/Toast";
import DashboardView from "./views/DashboardView";
import RegisterCandidateView from "./views/RegisterCandidateView";
import VotingView from "./views/VotingView";
import CandidatesView from "./views/CandidatesView";
import BackupView from "./views/BackupView";

import { loadCandidates, saveCandidates } from "./utils/localStorage";

function App() {
  const [view, setView] = useState("dashboard");
  const [candidates, setCandidates] = useState(() => {
    const saved = loadCandidates();
      console.log("Candidatos desde localStorage:", saved); 
  console.log("Candidatos iniciales:", initialCandidates); 
    return saved ?? initialCandidates;
  });
  const [editingCandidate, setEditingCandidate] = useState(null);
  const [toast, setToast] = useState({
    type: "",
    title: "",
    message: "",
  });

  useEffect(() => {
    saveCandidates(candidates);
  }, [candidates]);

  useEffect(() => {
    if (!toast.message) return;

    const timer = setTimeout(() => {
      setToast({ type: "", title: "", message: "" });
    }, 2800);

    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (type, title, message) => {
    setToast({ type, title, message });
  };

  const handleSaveCandidate = (candidateData) => {
    if (editingCandidate) {
      setCandidates((prev) =>
        prev.map((candidate) =>
          candidate.id === editingCandidate.id
            ? { ...candidate, ...candidateData }
            : candidate
        )
      );
      setEditingCandidate(null);
      setView("candidatos");
      showToast("success", "Candidato actualizado", "Los datos del candidato se actualizaron correctamente.");
    } else {
      const newCandidate = {
        id: Date.now(),
        ...candidateData,
        votos: 0,
      };

      setCandidates((prev) => [...prev, newCandidate]);
      setView("candidatos");
      showToast("success", "Candidato registrado", "El candidato fue creado correctamente.");
    }
  };

  const handleEditCandidate = (candidate) => {
    setEditingCandidate(candidate);
    setView("registrar");
  };

  const handleCancelEdit = () => {
    setEditingCandidate(null);
    setView("candidatos");
    showToast("info", "Edición cancelada", "Se canceló la edición del candidato.");
  };

  const handleDeleteCandidate = (id) => {
    const confirmar = window.confirm("¿Deseas eliminar este candidato?");
    if (!confirmar) return;

    setCandidates((prev) => prev.filter((candidate) => candidate.id !== id));

    if (editingCandidate && editingCandidate.id === id) {
      setEditingCandidate(null);
    }

    showToast("success", "Candidato eliminado", "El candidato fue eliminado correctamente.");
  };

  const handleVote = (id) => {
    const selected = candidates.find((candidate) => candidate.id === id);

    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id
          ? { ...candidate, votos: candidate.votos + 1 }
          : candidate
      )
    );

    showToast(
      "success",
      "Voto registrado",
      `El voto fue asignado a ${selected?.nombre ?? "el candidato"}.`
    );
  };

  const handleImportCandidates = (importedCandidates) => {
    setCandidates(importedCandidates);
    setEditingCandidate(null);
    setView("dashboard");
    showToast("success", "Importación exitosa", "Los candidatos fueron importados correctamente.");
  };

  const handleResetCandidates = (resetCandidates) => {
    setCandidates(resetCandidates);
    setEditingCandidate(null);
    setView("dashboard");
    showToast("info", "Datos reiniciados", "Se restablecieron los candidatos por defecto.");
  };

  return (
    <div className="app">
      <Topbar view={view} setView={setView} />

      <main className="container">
        <Toast
          toast={toast}
          onClose={() => setToast({ type: "", title: "", message: "" })}
        />

        {view === "dashboard" && <DashboardView candidates={candidates} />}

        {view === "registrar" && (
          <RegisterCandidateView
            onSave={handleSaveCandidate}
            editingCandidate={editingCandidate}
            onCancelEdit={handleCancelEdit}
            showToast={showToast}
          />
        )}

        {view === "votar" && (
          <VotingView candidates={candidates} onVote={handleVote} />
        )}

        {view === "candidatos" && (
          <CandidatesView
            candidates={candidates}
            onEdit={handleEditCandidate}
            onDelete={handleDeleteCandidate}
            onVote={handleVote}
          />
        )}

        {view === "backup" && (
          <BackupView
            candidates={candidates}
            onImportCandidates={handleImportCandidates}
            onResetCandidates={handleResetCandidates}
            showToast={showToast}
          />
        )}
      </main>
    </div>
  );
}

export default App;