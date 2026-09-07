export default function HomePage() {
  return (
    <>
      <aside className="sidebar">
        <div className="logo">Eduin Global</div>
        <div className="tagline">Education Management Platform</div>
        <nav className="nav">
          <button className="active">
            <span>Dashboard</span>
          </button>
          <button>
            <span>Programmes</span>
          </button>
          <button>
            <span>Courses</span>
          </button>
          <button>
            <span>Students</span>
          </button>
          <button>
            <span>Payments</span>
          </button>
        </nav>
      </aside>
      <div className="main">
        <header className="topbar">
          <div>Admin</div>
          <div>Eduin Global</div>
        </header>
        <div className="content">
          <h1 className="page-title">Dashboard</h1>
          <div className="cards">
            <div className="card">
              <div className="card-title">Programmes</div>
              <div className="card-value">0</div>
            </div>
            <div className="card">
              <div className="card-title">Courses</div>
              <div className="card-value">0</div>
            </div>
            <div className="card">
              <div className="card-title">Students</div>
              <div className="card-value">0</div>
            </div>
            <div className="card">
              <div className="card-title">Payments</div>
              <div className="card-value">0</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
