function Topbar({ view, setView }) {
  const items = [
    { key: "dashboard", label: "Dashboard" },
    { key: "registrar", label: "Registrar candidato" },
    { key: "votar", label: "Panel de votación" },
    { key: "candidatos", label: "Listado de candidatos" },
    { key: "backup", label: "Backup" },
  ];

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-dot"></div>
        <div>
          <h1>Votación Full Stack</h1>
          <p>SPA con navegación por vistas y componentes reutilizables</p>
        </div>
      </div>

      <nav className="nav">
        {items.map((item) => (
          <button
            key={item.key}
            className={view === item.key ? "active" : ""}
            onClick={() => setView(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Topbar;