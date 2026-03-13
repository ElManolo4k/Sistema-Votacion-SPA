function Toast({ toast, onClose }) {
  if (!toast?.message) return null;

  return (
    <div className={`toast toast-${toast.type}`}>
      <div>
        <strong>{toast.title}</strong>
        <p>{toast.message}</p>
      </div>

      <button className="toast-close" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

export default Toast;