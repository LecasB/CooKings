import React, { useState } from "react";
import "../../estilos/LoginForm.css";
import "../../estilos/SignUpForm.css";
import Logo from "../../imagens/cooKingsImagev1.png";
import LoginButton from "../LoginPage/LoginButton";
import InputText from "./InputText";
import CheckBox from "./CheckBox";
import Text from "./Text";
import supabase from "../../supabaseClient";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const verifyLogin = async () => {
    try {
      
      const { data, error } = await supabase
        .from("Users")
        .select("*")
        .eq("username", username)
        .eq("password", password)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        // Redirect to UserPage
        window.location.href = "/UserPage";
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const redirectToSignup = () => {
    window.location.href = "/SignUpPage";
  };

  return (
    <div id="page">
      <form id="SignUpForm">
        <img src={Logo} alt="Logo" />
        <InputText
          texto={"Username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputText
          texto={"Password"}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div id="checkAndText">
          <CheckBox />
          <Text texto="Forgot your Password?" />
        </div>

        <LoginButton texto={"Log in"} onClick={verifyLogin} />
        <Text texto="Or" />
        <Text texto="Don't have an account yet?" />
        <LoginButton texto={"Create Account"} onClick={redirectToSignup} />
      </form>
    </div>
  );
};

export default LoginForm;
