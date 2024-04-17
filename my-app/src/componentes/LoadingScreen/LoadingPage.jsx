import React from "react";
import Logo from "../../imagens/cooKingsImagev1.png";
import "../../estilos/LoadingPage.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingScreen = () => {
  const cookingTips = [
    "Use herbs and spices instead of salt for flavoring.",
    "Opt for grilling, baking, or steaming over frying.",
    "Include plenty of colorful fruits and vegetables in your meals.",
    "Choose whole grains like brown rice and quinoa.",
    "Try different protein sources like beans, tofu, and lean meats.",
    "Limit processed foods and opt for fresh ingredients.",
    "Practice portion control to avoid overeating.",
    "Stay hydrated by drinking plenty of water.",
    "Plan your meals ahead for healthier choices.",
    "Enjoy your meals mindfully, savoring each bite.",
  ];

  const randomIndex = Math.floor(Math.random() * cookingTips.length);
  const randomTip = cookingTips[randomIndex];

  return (
    <div id="LoadingPage">
      <img src={Logo}></img>
      <h1>Tip: {randomTip}</h1>
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div>
  );
};

export default LoadingScreen;
