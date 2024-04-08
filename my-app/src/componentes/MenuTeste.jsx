// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoadingScreen from "./LoadingScreen/LoadingPage";
import LoginPage from "./LoginPage/LoginForm";
import SignUpPage from "./SignUpPage/SignUpForm";

const MenuTeste = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/LoadingPage">Home</Link>
            </li>
            <li>
              <Link to="/LoginPage">About</Link>
            </li>
            <li>
              <Link to="/SignUpPage">Contact</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/LoadingPage" component={LoadingScreen} />
          <Route path="/LoginPage" component={LoginPage} />
          <Route path="/SignUpPage" component={SignUpPage} />
        </Routes>
      </div>
    </Router>
  );
};

export default MenuTeste;
