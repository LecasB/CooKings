import React, { useEffect, useState } from "react";
import "../estilos/CardProcurar.css";
import supabase from "../supabaseClient";
import { Link } from "react-router-dom";
import FavoriteButton from "./SearchPage/FavoriteButton";

const CardProcurar = ({ titulo, texto, image, iduser, id }) => {
  const [isClicked, setIsClicked] = useState(false);

  function refreshPage() {
    window.parent.location();
  }

  const handleSvgClick = () => {
    setIsClicked(!isClicked);
  };

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
          {iduser && <FavoriteButton />}
        </div>
      </div>
    </div>
  );
};

export default CardProcurar;
