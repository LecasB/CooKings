import React from "react";
import { Link } from "react-router-dom";

const CardTeste = ({
  id,
  name,
  category,
  description,
  editCategoria,
  deleteCategoria,
  imagem,
}) => {
  return (
    /* <div>
      <h2>{name}</h2>
      <h3>{category}</h3>
      <img src={imagem} alt="" srcset="" />
      <p>{description}</p>
      <div className="cont-actions-procurar">
        <Link to={`/EditIngrediente?id=${id}`}>
          <button>Editar</button>
        </Link>
        <button onClick={() => deleteCategoria(id)}>Apagar</button>
      </div>
    </div> */
    <div className="card-procurar" style={{ margin: 10 }}>
      <figure className="cont-img-procurar">
        <img src={imagem} alt="" />
      </figure>
      <div className="cont">
        <div className="cont-text">
          <h2 style={{ maxWidth: 140 }}>{name}</h2>
          <p>{description}</p>
        </div>

        <div className="cont-actions-procurar">
          <Link to={`../EditIngrediente?id=${id}`}>
           Editar
          </Link>
          
          <a id="apagar" onClick={() => deleteCategoria(id)}>Apagar</a>
        </div>
      </div>
    </div>
  );
};

export default CardTeste;
