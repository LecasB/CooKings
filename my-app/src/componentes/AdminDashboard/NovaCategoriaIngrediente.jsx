import React, { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import { Link } from "react-router-dom";

const NovaCategoriaIngrediente = () => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false); // Define submitted state
  const [categorias, setCategorias] = useState([]);

  async function getCategorias() {
    try {
      const { data, error } = await supabase
        .from("Category_Ingredients")
        .select();

      if (error) {
        throw error;
      }

      setCategorias(data);
    } catch (error) {
      console.error("Error fetching categorias:", error.message);
    }
  }

  useEffect(() => {
    getCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("Category_Ingredients")
        .insert([
          {
            name,
          },
        ]);

      if (error) {
        throw error;
      }

      console.log("Data inserted successfully:", data);

      setName("");
      setSubmitted(true); // Set submitted state to true after successful submission
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  };

  return (
    <div id="novaCategoriaIngrediente">
      <h1>New Ingredient's Category</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {submitted && <Link to="/AdminDashboardPage/">Back to Dashboard</Link>}{" "}
      {/* Adjust Link text */}
      <div>
        {categorias.map((categoria) => (
          <ul key={categoria.idcategory}>
            <li>
              ID: {categoria.idcategory} Name: {categoria.name}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default NovaCategoriaIngrediente;
