import React from "react";
import { Link } from "react-router-dom";


const CardTeste = ({
  id,
  name,
  category,
  description,
  editCategoria,
  deleteCategoria,
}) => {
  return (
    <div>
        <h2>{name}</h2>
        <h3>{category}</h3>
        <p>{description}</p>
		<div className="cont-actions-procurar">
        <Link to={`/EditIngrediente?id=${id}`}>
          <button>Editar</button>
        </Link>
        <button onClick={() => deleteCategoria(id)}>Apagar</button>
		
      </div>
    </div>
  );
};

export default CardTeste;
