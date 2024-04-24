import React from "react";
import Logo from "../../imagens/cooKingsImagev1.png";
import LoginButton from "../LoginPage/LoginButton";
import InputText from "./InputText";
import "../../estilos/SignUpForm.css";
import "../../estilos/LoginForm.css";
import Text from "./Text";

const SignUpForm = () => {
  const verifyLogin = () => {
    alert("Logined!");
  };
  const verifyCreateAcc = () => {
    alert("Acc Created");
  };
  return (
    <div id="page">
      <form id="SignUpForm">
        <img src={Logo}></img>
        <InputText texto={"Username"} />
        <InputText texto={"Password"} />
        <InputText texto={"Confirm Password"} />
        <LoginButton texto={"Create Account"} onClick={verifyCreateAcc} />
        <Text texto="Or"></Text>
        <LoginButton texto={"Log In"} onClick={verifyLogin} />
      </form>
    </div>
  );
};

export default SignUpForm;
