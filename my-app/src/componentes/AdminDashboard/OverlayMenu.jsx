import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../imagens/cooKingsImagev1.png";
import supabase from "../../supabaseClient";


const OverlayMenu = ({ isOpen, onClose}) => {
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
          {userAdmin ? (
          <>
            <li><Link to="/AdminDashboardPage/Dashboard">Dashboard</Link></li>
            <li><Link to="/AdminDashboardPage/NovoIngrediente">New Ingredient</Link></li>
            <li><Link to="/AdminDashboardPage/NovaReceita">New Recipe</Link></li>
            <li><Link to="/AdminDashboardPage/NovaCategoriaIngrediente">New Ingredient Category</Link></li>
            <li><Link to="/AdminDashboardPage/NovaCategoriaReceita">New Recipe Category</Link></li>
            <li><Link to="/AdminDashboardPage/ListaIngridiente">Ingredient List</Link></li>
            <li><Link to="/AdminDashboardPage/ListaReceitas">Recipe List</Link></li>
          </>
        ) : user ? (
          <>
            <li><Link to="/AdminDashboardPage/Dashboard">Dashboard</Link></li>
            <li><Link to="/AdminDashboardPage/NovoIngrediente">New Recipe</Link></li>
            <li><Link to="/AdminDashboardPage/NovaReceita">My Ingredients</Link></li>
            <li><Link to="/AdminDashboardPage/NovaCategoriaIngrediente">Add Ingredient</Link></li>
            <li><Link to="/AdminDashboardPage/NovaCategoriaReceita">My Favourites</Link></li>
            <li><Link to="/AdminDashboardPage/ListaIngridiente">My Profile</Link></li>
          </>
        ) : null}
          
          <li><Link to="/">Menu</Link></li>
        </ul>
      </div>
    );
  };
  
  export default OverlayMenu;