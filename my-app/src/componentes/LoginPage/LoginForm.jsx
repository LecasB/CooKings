import React from 'react';
import LoginButton from './LoginButton';
import InputText from './InputText';
import "../../estilos/LoginForm.css"
import Logo from '../../imagens/cooKingsImagev1.png';

const LoginForm = () => {
    return(
        <div id="LoginForm">
        <img src={Logo}></img>
        <InputText texto={"Username"} />
        <InputText texto={"Password"}  />
        <InputText texto={"Confirm Password"} />
        <LoginButton texto={"Create Account"}/>
        <LoginButton texto={"Log in"}/> 
        </div>
           )
}


export default LoginForm;