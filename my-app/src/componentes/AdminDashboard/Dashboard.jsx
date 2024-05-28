import React, { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import { Link } from "react-router-dom";
import "./Admin.css";


const Dashboard = () => {
  const [date, setDate] = useState("");
  const [ingredients, setIngredients] = useState(0);
  const [recipes, setRecipes] = useState(0);

  function getGreeting() {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 5 && hours < 12) {
      return "Good Morning!";
    } else if (hours >= 12 && hours < 19) {
      return "Good Afternoon!";
    } else {
      return "Good Evening!";
    }
  }

  async function getData() {
    const { count: ingredientCount } = await supabase
      .from("Ingredients")
      .select("*", { count: "exact" });
    const { count: recipeCount } = await supabase
      .from("Recipes")
      .select("*", { count: "exact" });

    setIngredients(ingredientCount);
    setRecipes(recipeCount);
  }

  useEffect(() => {
    setDate(getGreeting());
    getData();
  }, []);

  return (
    <div className="dashBoardMain">
      <h1>{date} Admin :)</h1>
      <div className="dashBoardCards">
        <div className="cardDashboard">
          <h2>Total Recipes:</h2>
          <h3>Recipes: {recipes}</h3>
          <Link to="../ListaReceitas">
            <button>View All</button>
          </Link>
        </div>
        <div className="cardDashboard">
          <h2>Total Ingredients:</h2>
          <h3>Ingredients: {ingredients}</h3>
          <Link to="../ListaIngridiente">
            <button>View All</button>
          </Link>
          
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
