import React, { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import Logo from "../../imagens/cooKingsImagev1.png";
import LoginButton from "../LoginPage/LoginButton";
import InputText from "./InputText";
import Password from "./Password";
import Text from "./Text";
import "../../estilos/SignUpForm.css";
import "../../estilos/LoginForm.css";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [emailUser, setEmail] = useState("");
  const [passwordUser, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = async (event) => {
    event.preventDefault();
    
    if (passwordUser.length >= 6){
    const { user, error } = await supabase.auth.signUp({
      email: emailUser,
      password: passwordUser,
      options: {
        data: {
          username: username,
          photo: null,
          admin: false,
        },
      },
    });
    
    console.log("Sign up error:", error);

    if (error) {
      console.error("Sign up error:", error.message);
    } else {
      console.log("User signed up successfully:", user);
    }
  }else{
    alert("Password must be atleast 6 characters");
  }
}


  return (
    <div id="page">
      <form id="SignUpForm" onSubmit={signUp}>
        <img src={Logo} alt="Logo" />
        <InputText
          texto={"Username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputText
          texto={"Email"}
          value={emailUser}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Password
          texto={"Password: Required Atleast 6 Char"}
          value={passwordUser}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Password
          texto={"Confirm Password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <LoginButton texto={"Create Account"} type="submit" />
        <Text texto="Or" />
        <Link to="/LoginPage">
          <LoginButton texto={"Log In"} type="button" />
        </Link>
      </form>
    </div>
  );
};

export default SignUpForm;
