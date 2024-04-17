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
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="UserPage">
          <UserLateral />
          <UserInfo />
          <div className="card-section">
            <ListaCardProcurar dados={recipe} />
          </div>
        </div>
      </main>
    </>
  );
};

export default UserPage;
