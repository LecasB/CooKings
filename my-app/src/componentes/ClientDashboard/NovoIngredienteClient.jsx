import React, { useState, useEffect } from "react";
import supabase from "../../supabaseClient";

const NovoIngredienteClient = () => {
  const [nomes, setNomes] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [quantity, setQuantidade] = useState(1);
  const [unity, setUnidade] = useState("");
  const [date_expire, setCalendario] = useState("");
  const [userId, setUserId] = useState(null);

  async function getIngredient() {
    try {
      const { data, error } = await supabase.from("Ingredients").select();

      if (error) {
        throw error;
      }

      setNomes(data);
    } catch (error) {
      console.error("Error fetching ingredientes:", error.message);
    }
  }

  async function getUser() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error fetching user session:", error.message);
      return;
    }

    if (data.session) {
      setUserId(data.session.user.id);
    }
  }

  useEffect(() => {
    getIngredient();
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from("Product_User").insert([
        {
          idIng: selectedIngredient,
          iduser: userId,
          quantity,
          unity,
          date_expire,
        },
      ]);

      if (error) {
        throw error;
      }

      console.log("Data inserted successfully:", data);

      setSelectedIngredient("");
      setQuantidade(1);
      setUnidade("");
      setCalendario("");
    } catch (error) {
      console.error("Error inserting data:", error.message);
    }
  };

  return (
    <div className="novoIngredienteClient">
      <div className="novoIngredienteForm">
        <div></div>
        <form onSubmit={handleSubmit}>
          <h1>Add your Ingredient</h1>
          <select
            value={selectedIngredient}
            onChange={(e) => setSelectedIngredient(e.target.value)}
          >
            <option value="" disabled>
              Select an ingredient
            </option>
            {nomes.map((nome) => (
              <option key={nome.idingridients} value={nome.idingridients}>
                {nome.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantidade(e.target.value)}
          />
          <input
            type="text"
            placeholder="Unity"
            value={unity}
            onChange={(e) => setUnidade(e.target.value)}
          />
          <input
            type="date"
            value={date_expire}
            onChange={(e) => setCalendario(e.target.value)}
          />
          <button type="submit">Submit</button>
          <p>
            *If the ingredient you are looking for does not exist, click here to
            suggest it.*
          </p>
        </form>
        <div></div>
      </div>
    </div>
  );
};

export default NovoIngredienteClient;
