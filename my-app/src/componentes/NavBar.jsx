import React from "react";
import cooKingsImage from "../imagens/cooKingsImagev1.png";
import "../estilos/NavBar.css";
import { Storage, Profile } from "../imagens/svgs.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navBar">
      <div className="logoContainer">
        <img src={cooKingsImage} alt="CooKings Logo" />
      </div>
      <div>
        <ul className="linksContainer">
          <li>
            <Link className="linkItem" to="/LoadingPage">
              Loading Page
            </Link>
          </li>
          <li>
            <Link className="linkItem" to="/LoginPage">
              Login Form
            </Link>
          </li>
          <li>
            <Link className="linkItem" to="/SignUpPage">
              Sign Up
            </Link>
          </li>
          <li>
            <Link className="linkItem" to="/SearchPage">
              Search page
            </Link>
          </li>
          <li>
            <Link className="linkItem" to="/IndexPage">
              Index page
            </Link>
          </li>
          <li>
            <Link className="linkItem" to="/UserPage">
              User page
            </Link>
          </li>
          <li>
            <Link className="linkItem" to="/EditRecipePage">
              EditRecipe
            </Link>
          </li>
          <li>
            <Link
              className="linkItem"
              to="/IngredientsListPage/IngredientsListPage"
            >
              IngredientsListPage
            </Link>
          </li>
          <li>
            <Link className="linkItem" to="/ErrorPage">
              ErrorPage
            </Link>
          </li>
          <li>
            <Link className="linkItem" to="/dashboardTeste">
              TesteAdmin
            </Link>
          </li>
          <li className="linksItems">
            <Storage />
          </li>
          <li className="linksItems">
            <Profile />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
