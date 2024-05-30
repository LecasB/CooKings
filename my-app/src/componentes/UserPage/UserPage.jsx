import React from "react";

import NavBar from "../NavBar";
import UserLateral from "./UserLateral";
import UserInfo from "./UserInfo";
import "../../estilos/UserLateral.css";
import CardProcurar from "../CardProcurar";
import ListaCardProcurar from "../ListCardProcurar";
import recipe from "../ArrayInfo";

const UserPage = () => {
  return (
    <main className="perfilUser">
        <UserInfo />
    </main>
  );
};

export default UserPage;
