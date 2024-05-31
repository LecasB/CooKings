import React, { useEffect, useState } from "react";
import "../estilos/CardProcurar.css";
import supabase from "../supabaseClient";
import { Link } from "react-router-dom";
import FavoriteButton from "./SearchPage/FavoriteButton";

const CardProcurar = ({ titulo, texto, image, iduser, id }) => {
  function refreshPage() {
    window.parent.location();
  }

  const idForUser = iduser ? iduser.id : null;
  //alert(idForUser);

  return (
    <div className="card-procurar">
      <figure className="cont-img-procurar">
        <img src={image} alt="" />
      </figure>
      <div className="cont">
        <div className="cont-text">
          <h2>{titulo}</h2>
          <p>{texto}</p>
        </div>

        <div className="cont-actions-procurar">
          <Link onClick={refreshPage} to={`/ViewRecipePage?=${id}`}>
            <buton>View</buton>
          </Link>
          {iduser && <FavoriteButton idRecipes={id} idUser={idForUser} />}
        </div>
      </div>
    </div>
  );
};

export default CardProcurar;
