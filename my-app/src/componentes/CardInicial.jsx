import React from "react";
import "../estilos/EstilosDoCardInicial.css";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";
import FavoriteButton from "./SearchPage/FavoriteButton";

const CardInicial = ({ id, titulo, texto, img, user }) => {
  return (
    <div className="card-pi">
      <div className="cont-img">
        <img src={img} alt="" />
      </div>
      <div className="cont">
        <div className="cont-text">
          <h2>{titulo}</h2>
          <p>{texto}</p>
        </div>

        <div className="cont-actions">
          <Link to={`ViewRecipePage?=${id}`}>
            <button type="button">View recipe</button>
          </Link>

          {user && <FavoriteButton idRecipes={id} idUser={user.id} />}
        </div>
      </div>
    </div>
  );
};

export default CardInicial;
