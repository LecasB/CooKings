import React, { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { Link } from "react-router-dom";
import CardTeste from "./CardTeste";

const ListaReceitas = () => {
  const [categorias, setCategorias] = useState([]);

  async function getCategorias() {
    try {
      const { data, error } = await supabase.from("Recipes").select();

      if (error) {
        throw error;
      }

      setCategorias(data);
    } catch (error) {
      console.error("Error fetching categorias:", error.message);
    }
  }

  async function deleteCategoria(id) {
    try {
      await supabase.from("Recipes").delete().eq("idrecipe", id);

      getCategorias();
    } catch (error) {
      console.error("Error deleting categoria:", error.message);
    }
  }

  useEffect(() => {
    getCategorias();
  }, []);

  return (
    <>
      <div id="ingridientsList">
        <div>
          <h1>Recipes List</h1>
        </div>
        
        <div className="recipesMap">
          {categorias.map((categoria) => (
            <div key={categoria.idrecipe}>
              <CardTeste
                id={categoria.idrecipe}
                name={categoria.name}
                category={categoria.idcategory}
                description={categoria.description}
                imagem={categoria.image}
                deleteCategoria={deleteCategoria}
                editLink={`../EditRecipe?id=`}
              />
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default ListaReceitas;
