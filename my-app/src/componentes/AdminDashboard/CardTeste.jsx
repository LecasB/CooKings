import React, { useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabaseClient"


const CardTeste = ({
  id,
  name,
  category,
  description,
  editCategoria,
  deleteCategoria,
  imagem,
  editLink,
}) => {

  const [categoria, setCategory] = useState("");

  async function getCategoriasNome() {
    try {
      const { data, error } = await supabase.from("Ingredients").select();

      if (error) {
        throw error;
      }

      setCategory(data);
    } catch (error) {
      console.error("Error fetching categorias:", error.message);
    }
  }

  
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
          <h3></h3>
          <p>{description}</p>
          
        </div>

        <div className="cont-actions-procurar">
          <Link to={`${editLink}${id}`}>
           Editar
          </Link>
          
          <a id="apagar" onClick={() => deleteCategoria(id)}>Apagar</a>
        </div>
      </div>
    </div>
  );
};

export default CardTeste;
