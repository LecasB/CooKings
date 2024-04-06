import React from 'react';
import InputTextUser from './InputTextUser';
import LoginButton from './LoginButton';
import InputTextPassword from './InputTextPassword';
import InputTextConfPassword from './InputTextConfPassword';
import "../../estilos/LoginForm.css"
import CreateAccButton from './CreateAccButton';
import Logo from './Logo';

const Login = () => {
    return(
        <div id="LoginForm">
        <Logo/>
        <InputTextUser />
        <InputTextPassword />
        <InputTextConfPassword />
        <CreateAccButton/>
        <LoginButton/> 
        </div>
           )
}


export default Login;