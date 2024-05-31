import React, { useState, useEffect } from "react";
import supabase from "../../supabaseClient";

const EditIngredienteClient = () => {
  const [nomes, setNomes] = useState([]);
  const [edits, setEdits] = useState({});
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [quantity, setQuantidade] = useState(1);
  const [unity, setUnidade] = useState("");
  const [date_expire, setCalendario] = useState("");
  const [userId, setUserId] = useState(null);

  const url = window.location.href;
  const match = url.match(/\d+$/);
  const idingridients = match ? match[0] : null;

  async function getIngredient() {
    try {
      const { data, error } = await supabase.from("Ingredients").select();

      if (error) {
        throw error;
      }

      setNomes(data);
    } catch (error) {
      console.error("Error fetching ingredients:", error.message);
    }
  }

  async function editIngredient() {
    try {
      const { data, error } = await supabase
        .from("Product_User")
        .select()
        .eq("id", idingridients);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const ingredientData = data[0];
        setEdits(ingredientData);
        setSelectedIngredient(ingredientData.idIng);
        setQuantidade(ingredientData.quantity);
        setUnidade(ingredientData.unity);
        setCalendario(ingredientData.date_expire);
      }
    } catch (error) {
      console.error("Error fetching ingredient:", error.message);
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
    if (idingridients) {
      editIngredient();
    }
  }, [idingridients]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.from("Product_User").update([
        {
          idIng: selectedIngredient,
          iduser: userId,
          quantity,
          unity,
          date_expire,
        },
      ]).eq("id", idingridients);

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
          <h1>Edit Your Ingredient</h1>
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

export default EditIngredienteClient;
