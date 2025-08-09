import './Navbar.css';
import logo from '../../img/logo.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';


export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />
      <ul className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/games">Jogos</Link>
        <Link to="/rules">Regras</Link>
        <Link to="/runs">Runs</Link>
        {user ? (
        <>
          <Link to="/profile">{user.username}</Link>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
      </ul>
    </nav>
  );
}
