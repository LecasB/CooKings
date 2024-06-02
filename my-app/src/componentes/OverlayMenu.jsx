import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../estilos/NavBar.css";
import Logo from "../imagens/cooKingsImagev1.png";
import supabase from "../supabaseClient";

const OverlayMenu = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [userAdmin, setAdmin] = useState(false);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
      setAdmin(user.user_metadata.admin);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={`mobileLinkItem ${isOpen ? "open" : ""}`} onClick={onClose}>
      <ul>
        <img srcSet={Logo} alt="Logo" />
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/SearchPage">Search page</Link>
        </li>
        {!user && (
          <>
            <li>
              <Link to="/LoginPage">Login In</Link>
            </li>
            <li>
              <Link to="/SignUpPage">Sign Up</Link>
            </li>
          </>
        )}
        {userAdmin ? (
          <li>
            <Link to="/adminDashboardPage">Admin Dashboard</Link>
          </li>
        ) : user ? (
          <li>
            <Link to="/clientDashboard">Client Dashboard</Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default OverlayMenu;
