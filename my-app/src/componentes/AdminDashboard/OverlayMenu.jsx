import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../imagens/cooKingsImagev1.png";


const OverlayMenu = ({ isOpen, onClose}) => {
    return (
      <div className={`mobileLinkItem ${isOpen ? "open" : ""}`} onClick={onClose}>
        <ul>
          <img srcSet={Logo}></img>
          <li><Link to="/AdminDashboardPage/NovoIngrediente">New Ingredient</Link></li>
          <li><Link to="/AdminDashboardPage/NovaReceita">New Recipe</Link></li>
          <li><Link to="/AdminDashboardPage/NovaCategoriaIngrediente">New Ingredient Category</Link></li>
          <li><Link to="/AdminDashboardPage/NovaCategoriaReceita">New Recipe Category</Link></li>
          <li><Link to="/AdminDashboardPage/ListaIngridiente">Ingredient List</Link></li>
          <li><Link to="/AdminDashboardPage/ListaReceitas">Recipe List</Link></li>
          <li><Link to="/">Menu</Link></li>
        </ul>
      </div>
    );
  };
  
  export default OverlayMenu;