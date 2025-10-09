import { useUser } from '@/context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { isLoggedIn, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex justify-between bg-black p-4 text-white">
      <h1>QNW</h1>
      <nav className="flex gap-4">
        <Link to="/">Hem</Link>
        <Link to="/products">Produkter</Link>
        <Link to="/cart">Varukorg</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logga ut</button>
        ) : (
          <Link to="/login">Logga in</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
