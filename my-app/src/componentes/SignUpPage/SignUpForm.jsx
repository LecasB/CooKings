import React, { useState } from "react";
import supabase from "../../supabaseClient";
import Logo from "../../imagens/cooKingsImagev1.png";
import LoginButton from "../LoginPage/LoginButton";
import InputText from "./InputText";
import Password from "./Password";
import Text from "./Text";
import "../../estilos/SignUpForm.css";
import "../../estilos/LoginForm.css";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("Users")
        .insert([{ username, password, email }]);

      if (error) {
        throw error;
      }

      console.log("Data inserted successfully:", data);

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error inserting data:", error.message);
      alert("Failed to create account. Please try again later.");
    }
  };

  const verifyLogin = () => {
    alert("Logged in!");
  };

  return (
    <div id="page">
      <form id="SignUpForm" onSubmit={handleSubmit}>
        <img src={Logo} alt="Logo" />
        <InputText
          texto={"Username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputText
          texto={"Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Password
          texto={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Password
          texto={"Confirm Password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <LoginButton texto={"Create Account"} type="submit" />
        <Text texto="Or" />
        <LoginButton texto={"Log In"} onClick={verifyLogin} />
      </form>
    </div>
  );
};

export default SignUpForm;
