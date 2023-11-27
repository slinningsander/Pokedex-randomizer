import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <ul className="navbar">
      <li className="nav-item" onClick={() => handleNavigation('/project1')}>
        <p>Home</p>
      </li>
      <li className="nav-item" onClick={() => handleNavigation('/project1/details/favorites')}>
        <p>Favorites</p>
      </li>
    </ul>
  );
};

export default Navbar;
