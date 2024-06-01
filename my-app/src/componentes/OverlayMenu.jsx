import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../estilos/NavBar.css";
import Logo from "../imagens/cooKingsImagev1.png";
import supabase from "../supabaseClient";

const OverlayMenu = ({ isOpen, onClose }) => {
  const [user, setUser] = useState();
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
        <img srcSet={Logo}></img>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/LoginPage">Login Form</Link>
        </li>
        <li>
          <Link to="/SignUpPage">Sign Up</Link>
        </li>
        <li>
          <Link to="/SearchPage">Search page</Link>
        </li>

        {userAdmin ? (
          <li>
            <Link to="/AdminDashboardPage/Dashboard">Admin</Link>
          </li>
        ) : user ? (
          <li>
            <Link to="/UserPage">User page</Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default OverlayMenu;
