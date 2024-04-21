import React from "react";
import "../../estilos/LoginForm.css";
import "../../estilos/SignUpForm.css";
import Logo from "../../imagens/cooKingsImagev1.png";
import LoginButton from "../LoginPage/LoginButton";
import InputText from "./InputText";
import CheckBox from "./CheckBox";
import Text from "./Text";


const LoginForm = () => {
  return (
    <div id="page">
    <div id="SignUpForm">
      <img src={Logo}></img>
      <InputText texto={"Username"} />
      <InputText texto={"Password"} />
      <CheckBox></CheckBox>
      <Text texto="Forgot your Password?"></Text>
      <LoginButton texto={"Log in"} />
      <Text texto="Or"></Text>
      <Text texto="Dont have a account yet?"></Text>
      <LoginButton texto={"Create Account"} />
      </div>
      
    
      
    </div>
  );
};

export default LoginForm;
