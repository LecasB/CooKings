import React, { useEffect, useState } from "react";
import "../../estilos/LoginForm.css";
import "../../estilos/SignUpForm.css";
import Logo from "../../imagens/cooKingsImagev1.png";
import LoginButton from "../LoginPage/LoginButton";
import InputText from "./InputText";
import CheckBox from "./CheckBox";
import Text from "./Text";
import supabase from "../../supabaseClient";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

let { error } = await supabase.auth.signOut();

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        alert(error.message);
        console.error("Error signing in:", error.message);
      } else {
        console.log("User signed in successfully:", data);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="page">
      <div id="SignUpForm">
        <Link to={"/"}>
          <img src={Logo} alt="Logo" />
        </Link>
        <InputText
          texto={"Email"}
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputText
          texto={"Password"}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div id="checkAndText">
          <CheckBox />
          <Link to="/EmailPasswordReset">
          <Text texto="Forgot your Password?" />
          </Link>
        </div>
        <LoginButton texto={"Log in"} type="submit" onClick={handleLogin} />
        <Text texto="Or" />
        <Text texto="Don't have an account yet?" />
        <Link to="/SignUpPage">
          <LoginButton texto={"Create Account"} type="button" />
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
