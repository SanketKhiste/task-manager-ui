import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from "../context/UserContext";
import '../style/Header.css';


const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
    }
  }, [user, setUser]);

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    navigate("/SignIn");
  };

  return (
    <header className="header">
      <h3 className="logo">Task Manager</h3>
          {/* Dashboard menu */}
          {user && (<nav className="dashboard-menu">
            <Link to="/UsersDashboard" className="menu-link">Dashboard</Link>
            {/* Add more links if needed */}
          </nav>)}

      {user && (
        <div className="user-info">
          <span>{user.name}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
