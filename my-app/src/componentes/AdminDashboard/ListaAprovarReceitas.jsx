import React, { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { Link } from "react-router-dom";
import CardTeste from "./CardTeste";
import AprovarReceitas from "./AprovarReceitas";

const ListaAprovarReceitas = () => {
  const [receitas, setReceitas] = useState([]);

  const getReceitas = async () => {
    try {
      const { data, error } = await supabase
        .from("Recipes")
        .select()
        .eq("state", false);

      if (error) {
        throw error;
      }

      setReceitas(data);
    } catch (error) {
      console.error("Error fetching categorias:", error.message);
    }
  };

  const updateReceitas = async (id) => {
    const { data, error } = await supabase
      .from("Recipes")
      .update({ state: true })
      .eq("idrecipe", id);

    getReceitas();
  };

  const deleteReceitas = async (id) => {
    try {
      await supabase.from("Recipes").delete().eq("idrecipe", id);

      getReceitas();
    } catch (error) {
      console.error("Error deleting categoria:", error.message);
    }
  };

  useEffect(() => {
    getReceitas();
  }, []);

  return (
    <div style={{ width: "100%", overflow: "auto", padding: "5px 10px" }}>
      <div>
      <h1>{receitas.length === 0 ? "No recipes available" : "Recipes List"  }</h1>
      </div>
      <div className="recipesMap">
        {receitas.map((receitas) => (
          <div key={receitas.idrecipe}>
            <AprovarReceitas
              id={receitas.idrecipe}
              name={receitas.name}
              description={receitas.description}
              imagem={receitas.image}
              updateReceitas={updateReceitas}
              deleteCategoria={deleteReceitas}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaAprovarReceitas;
