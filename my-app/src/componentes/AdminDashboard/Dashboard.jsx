import React, { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import { Link } from "react-router-dom";
import "./Admin.css";
import "../ClientDashboard/CardsDashboard.css";


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
    <div id="client-dashboard">
      <h1>Welcome! :)</h1>
      {/* <h3>You have {expire} Ingredients Expired</h3>
      <h3>You have {expiring} Ingredients Expiring</h3>
      <h3>You have {valid} Ingredients Valid</h3>
      <h3>You got {fav} favourites</h3>
      <h3>You have {produtos.length} Ingredients</h3> */}
      <div className="cards-display">
        <div className="card-clientdashboard">
          <div className="card-clientdashboard-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z" />
            </svg>
          </div>
          <div className="card-clientdashboard-text">
            <p className="card-clientdashboard-total">{ingredients}</p>
            <p className="card-clientdashboard-p">Total Ingredientes</p>
          </div>
        </div>
        <div className="card-clientdashboard-valid">
          <div className="card-clientdashboard-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="#45cf5c"
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
              />
            </svg>
          </div>
          <div className="card-clientdashboard-text">
            <p className="card-clientdashboard-total">{recipes}</p>
            <p className="card-clientdashboard-p">Total Receitas</p>
          </div>
        </div>
        
        </div>
      </div>
  
  );
};

export default Dashboard;
