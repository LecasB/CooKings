import React from "react";
import Logo from "../../imagens/cooKingsImagev1.png";
import LoginButton from "../LoginPage/LoginButton";
import InputText from "./InputText";
import "../../estilos/SignUpForm.css";
import "../../estilos/LoginForm.css";
import Text from "./Text";

const SignUpForm = () => {
  return (
    <div id="page">
    <div id="SignUpForm">
    <img src={Logo}></img>
    <InputText texto={"Username"} />
    <InputText texto={"Password"} />
    <InputText texto={"Confirm Password"} />
    <LoginButton texto={"Create Account"} />
    <Text texto="Or"></Text>
    <LoginButton texto={"Log in"} />
    </div>
  
    
  </div>
  
  );
};

export default SignUpForm;
