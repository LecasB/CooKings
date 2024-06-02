import React, { useEffect, useState } from "react";
import cooKingsImage from "../imagens/cooKingsImagev1.png";
import "../estilos/NavBar.css";
import { Storage, Profile } from "../imagens/svgs.jsx";
import OverlayMenu from "./OverlayMenu.jsx";
import supabase from "../supabaseClient";
import { Link } from "react-router-dom";

const NavBar = () => {
  let mediaQuery = window.matchMedia("(max-width: 980px)");
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();
  const [userAdmin, setAdmin] = useState(false);
  const [profileImageURL, setProfileImageURL] = useState(null);

  const ativarMenu = () => {
    setIsOpen(!isOpen);
  };

  const fecharMenu = () => {
    setIsOpen(false);
  };

  const hamburguer = () => {
    if (mediaQuery.matches) {
      document.getElementById("burger-icon").classList.remove("disabled");
      let linksItems = document.getElementsByClassName("linksItems");
      for (let item of linksItems) {
        item.classList.add("disabled");
      }
    } else {
      document.getElementById("burger-icon").classList.add("disabled");
      let linksItems = document.getElementsByClassName("linksItems");
      for (let item of linksItems) {
        item.classList.remove("disabled");
      }
    }
  };

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
      setAdmin(user.user_metadata.admin);
      setProfileImageURL(user.user_metadata?.profile_image_url || null);
    } else {
      setUser(null);
      setProfileImageURL(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    hamburguer();

    if (isOpen) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
    }

    mediaQuery.addEventListener("change", hamburguer);

    return () => {
      mediaQuery.removeEventListener("change", hamburguer);
    };
  }, [isOpen]);

  return (
    <header>
      <nav className="navBar">
        <div className="logoContainer">
          <Link to="/">
            <img src={cooKingsImage} alt="CooKings Logo" />
          </Link>
        </div>
        <div>
          <ul className="linksContainer">
            <li className="linksItems">
              <Link to={"/SearchPage"}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </Link>
            </li>
            <li className="linksItems">
              <Link
                to={
                  user == null
                    ? "/LoginPage"
                    : userAdmin
                    ? `LoadingPage?=/AdminDashboardPage/ListaReceitas`
                    : `LoadingPage?=/ClientDashboard/ListaIngredienteClient`
                }
              >
                <Storage />
              </Link>
            </li>
            <li className="linksItems">
              <Link
                to={
                  user == null
                    ? "/LoginPage"
                    : userAdmin
                    ? `LoadingPage?=/AdminDashboardPage`
                    : `LoadingPage?=/ClientDashboard`
                }
              >
                <Profile profileImageURL={profileImageURL} />
              </Link>
            </li>
            <li id="burger-icon" onClick={ativarMenu}>
              <label className={`burger ${isOpen ? "open" : ""}`} htmlFor="burger">
                <div className="line"></div>
              </label>
            </li>
          </ul>
        </div>
        <OverlayMenu isOpen={isOpen} onClose={fecharMenu} />
      </nav>
    </header>
  );
};

export default NavBar;