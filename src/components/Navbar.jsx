import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="site-header">
      <div className="organization-label">
        KARA × Seeds of Success
      </div>

      <nav className="navbar">
        <Link to="/" className="site-title">
          Responsible AI Toolkit
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/curriculum">Curriculum</Link>
          <Link to="/how-we-work-with-ai">
            How We Work With AI
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;