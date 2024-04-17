import React from "react";
import "../../estilos/LoginForm.css";
import "../../estilos/SignUpForm.css";
import Logo from "../../imagens/cooKingsImagev1.png";
import LoginButton from "../LoginPage/LoginButton";
import InputText from "./InputText";

const LoginForm = () => {
  return (
    <div id="SignUpForm">
      <img src={Logo}></img>
      <InputText texto={"Username"} />
      <InputText texto={"Password"} />
      <LoginButton texto={"Create Account"} />
      <LoginButton texto={"Log in"} />
    </div>
  );
};

export default LoginForm;
