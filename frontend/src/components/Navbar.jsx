import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Tournament Betting
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/tournaments">Tournaments</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
        <Link to="/register" className="nav-button">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;