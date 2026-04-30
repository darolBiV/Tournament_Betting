import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Tournament Betting</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/tournaments">Tournaments</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/matches">Matches</Link>
        <Link to="/bets">Bets</Link>

        {token && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="nav-button">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;