import CandidateItem from "./CandidateItem";

function CandidateList({ candidates, onEdit, onDelete, onVote, showActions = true }) {
  if (candidates.length === 0) {
    return <p className="muted">No hay candidatos registrados.</p>;
  }

  return (
    <div className="list">
      {candidates.map((candidate) => (
        <CandidateItem
          key={candidate.id}
          candidate={candidate}
          onEdit={onEdit}
          onDelete={onDelete}
          onVote={onVote}
          showActions={showActions}
        />
      ))}
    </div>
  );
}

export default CandidateList;