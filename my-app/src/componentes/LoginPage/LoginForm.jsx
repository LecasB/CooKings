import React from "react";
import LoginButton from "./LoginButton";
import InputText from "./InputText";
import "../../estilos/LoginForm.css";
import Logo from "../../imagens/cooKingsImagev1.png";
import Button from "@mui/material/Button";
import Input from '@mui/material/Input';

const LoginForm = () => {
  return (
    <div id="LoginForm">
      
      <img id="logo" src={Logo}></img>
      <Input id="username" placeholder="Username" variant="contained"></Input>
      <Input placeholder="Password" variant="contained"></Input>
      <Input placeholder="Confirm Password" variant="contained"></Input>
      <Button id="login-btn" variant="contained">Log In</Button>
      <Button id="create-btn" variant="contained">Create Account</Button>
    </div>
  );
};

export default LoginForm;
