import React from "react";
import { Link } from "react-router-dom";
import "../estilos/NavBar.css";

const OverlayMenu = ({ isOpen, onClose}) => {
    return (
      <div className={`mobileLinkItem ${isOpen ? "open" : ""}`} onClick={onClose}>
        <ul>
          <li><Link to="/LoadingPage">Loading Page</Link></li>
          <li><Link to="/LoginPage">Login Form</Link></li>
          <li><Link to="/SignUpPage">Sign Up</Link></li>
          <li><Link to="/SearchPage">Search page</Link></li>
          <li><Link to="/">Index page</Link></li>
          <li><Link to="/UserPage">User page</Link></li>
          <li><Link to="/EditRecipePage">Edit Recipe</Link></li>
          <li><Link to="/IngredientsListPage/IngredientsListPage">Ingredients List Page</Link></li>
          <li><Link to="/ErrorPage">Error Page</Link></li>
          <li><Link to="/DashboardTeste">Teste Admin</Link></li>
          <li><Link to="/AdminDashboardPage">Admin</Link></li>
        </ul>
      </div>
    );
  };
  
  export default OverlayMenu;