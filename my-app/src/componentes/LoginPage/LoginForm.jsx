import React from "react";
import "../../estilos/LoginForm.css";
import "../../estilos/SignUpForm.css";
import Logo from "../../imagens/cooKingsImagev1.png";
import LoginButton from "../LoginPage/LoginButton";
import InputText from "./InputText";
import CheckBox from "./CheckBox";
import Text from "./Text";
import supabase from "../../supabaseClient";

const LoginForm = () => {
  const verifyLogin = () => {
    alert("Sucesso");
  };

  return (
    <div id="page">
      <form id="SignUpForm">
        <img src={Logo}></img>
        <InputText texto={"Username"} />
        <InputText texto={"Password"} />
        <div id="checkAndText">
        <CheckBox></CheckBox>
        <Text texto="Forgot your Password?"></Text>
        </div>
        
        <LoginButton texto={"Log in"} />
        <Text texto="Or"></Text>
        <Text texto="Dont have a account yet?"></Text>
        {/* Pass verifyLogin as a reference without invoking it */}
        <LoginButton texto={"Create Account"} onClick={verifyLogin} />
      </form>
    </div>
  );
};

export default LoginForm;
