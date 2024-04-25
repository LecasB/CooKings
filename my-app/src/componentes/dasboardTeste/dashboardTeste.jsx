import React, { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

const DashboardTeste = () => {
  const [categorias, setCategorias] = useState([]);

  async function getCategorias() {
    try {
      const { data, error } = await supabase.from("Ingredients").select();

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
      await supabase.from("Ingredients").delete().eq("idingridients", id);

      getCategorias();
    } catch (error) {
      console.error("Error deleting categoria:", error.message);
    }
  }

  function editCategoria(id) {
    return <Link to={`/EditIngrediente?id=${id}`}>Editar</Link>;
  }
  

  useEffect(() => {
    getCategorias();
  }, []);

  return (
    <>
      <h1>Categorias de Ingredientes</h1>

      {categorias.map((categoria) => (
        <div key={categoria.idingridients} style={{ background: "beige" }}>
          <h2>{categoria.name}</h2>
          <h3>{categoria.idcategory}</h3>
          <p>{categoria.description}</p>
          <button>{editCategoria(categoria.idingridients)}</button>
          <button onClick={() => deleteCategoria(categoria.idingridients)}>
            Apagar
          </button>
        </div>
      ))}
      <Link to="/NovoIngrediente">
        <button>Adicionar Receita</button>
      </Link>
    </>
  );
};

export default DashboardTeste;
