import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext";

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
