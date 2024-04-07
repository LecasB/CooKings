import React from "react"
import Logo from '../../imagens/cooKingsImagev1.png';
import InputText from './InputText';
import LoginButton from "./LoginButton";

const SignUpForm = () => {
    return(
    <div id="SignUpForm">
        <img src={Logo}></img>
        <InputText texto={"Username"} />
        <InputText texto={"Password"}  />
        <LoginButton texto={"Create Account"}/>
        <LoginButton texto={"Log in"}/> 
    </div>
    )
}

export default SignUpForm;