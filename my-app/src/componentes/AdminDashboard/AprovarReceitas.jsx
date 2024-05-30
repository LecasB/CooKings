import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabaseClient";

const AprovarReceitas = ({
  id,
  name,
  category,
  description,
  editCategoria,
  deleteCategoria,
  imagem,
  editLink,
}) => {
  const [categoria, setName] = useState("");
  let dbCat = "";

  if (editLink == `../EditIngrediente?id=`) {
    dbCat = "Category_Ingredients";
  } else {
    dbCat = "Category_Recipes";
  }
  async function getCategoriasNome() {
    try {
      const { data, error } = await supabase
        .from(`${dbCat}`)
        .select("name")
        .eq("idcategory", category)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setName(data.name);
      }
    } catch (error) {
      console.error("Error fetching categorias:", error.message);
    }
  }

  useEffect(() => {
    getCategoriasNome();
  }, []);

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
          <Link to={`${editLink}${id}`}>Editar</Link>

          <a id="apagar" onClick={() => deleteCategoria(id)}>
            Apagar
          </a>
        </div>
      </div>
    </div>
  );
};

export default AprovarReceitas;
