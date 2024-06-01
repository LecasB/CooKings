import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabaseClient";

const AprovarReceitas = ({
  id,
  name,
  description,
  updateReceitas,
  deleteCategoria,
  imagem,
}) => {
  const [categoria, setName] = useState("");

  

  return (

    
    <div className="card-procurar" style={{ margin: 10 }}>
      <figure className="cont-img-procurar">
        <img src={imagem} alt="" />
      </figure>
      <div className="cont">
        <div className="cont-text">
          <h2 style={{ maxWidth: 140 }}>{name}</h2>
          <h3>{categoria}</h3>
          <p>{description}</p>
        </div>

        <div className="cont-actions-procurar">
          <a style={{ cursor: "pointer" }} onClick={() => updateReceitas(id)}>
            Aprovar
          </a>

          <a style={{ cursor: "pointer" }} onClick={() => deleteCategoria(id)}>
            Apagar
          </a>
        </div>
      </div>
    </div>
  );
};

export default AprovarReceitas;
