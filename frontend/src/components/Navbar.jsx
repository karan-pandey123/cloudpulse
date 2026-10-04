import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/monitoring', label: 'Monitoring' },
    { to: '/alerts', label: 'Alerts' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">☁️ CloudPulse</div>
      <div className="navbar-links">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`nav-link ${location.pathname === l.to ? 'active' : ''}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div className="navbar-user">
        <span>Hi, {user.name}</span>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;