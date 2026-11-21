import { Link } from "react-router-dom";
import SoSLogo from "../assets/SoSIconMarkLogo.svg";
import SoSLogoWhite from "../assets/SoSIconMarkLogoWhite.svg"

function Navbar() {
  return (
    <header className="site-header">
      <div className="organization-label">
        Seeds of Success
        <input type="checkbox" id="dark-mode-toggle"></input>
        <label for="dark-mode-toggle" class="toggle"></label>
      </div>

      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <img src={SoSLogo} alt="Seeds of Success Logo" className="img-light-mode"></img>
            <img src={SoSLogoWhite} alt="Seeds of Success Logo in White" className="img-dark-mode"></img>
          </div>

          <Link to="/" className="site-title">
            Responsible AI Toolkit
          </Link>
        </div>

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