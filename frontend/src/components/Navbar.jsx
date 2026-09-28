import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/monitoring">Monitoring</Link>
      <Link to="/alerts">Alerts</Link>
      <span style={{ marginLeft: 'auto' }}>Hi, {user.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
