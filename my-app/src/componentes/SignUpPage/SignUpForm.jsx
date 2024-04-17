import React from "react";
import Logo from "../../imagens/cooKingsImagev1.png";
import LoginButton from "../LoginPage/LoginButton";
import InputText from "./InputText";
import "../../estilos/SignUpForm.css";
import "../../estilos/LoginForm.css";

const SignUpForm = () => {
  return (
    <div id="LoginForm">
      <img id="logo" src={Logo}></img>
      <InputText
        id="username"
        placeholder="Username"
        variant="contained"
      ></InputText>
      <InputText placeholder="Password" variant="contained"></InputText>
      <InputText placeholder="Confirm Password" variant="contained"></InputText>
      <LoginButton texto={"Log In"} id="login-btn" variant="contained" />
      <LoginButton
        texto={"Create Account"}
        id="create-btn"
        variant="contained"
      />
    </div>
  );
};

export default SignUpForm;
