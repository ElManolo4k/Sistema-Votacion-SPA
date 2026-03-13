import CandidateForm from "../components/CandidateForm";

function RegisterCandidateView({
  onSave,
  editingCandidate,
  onCancelEdit,
  showToast,
}) {
  return (
    <section className="view">
      <CandidateForm
        key={editingCandidate ? editingCandidate.id : "new"}
        onSave={onSave}
        editingCandidate={editingCandidate}
        onCancelEdit={onCancelEdit}
        showToast={showToast}
      />
    </section>
  );
}

export default RegisterCandidateView;