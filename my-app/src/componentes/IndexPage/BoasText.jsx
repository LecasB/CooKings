import "../../estilos/IndexPage.css";
import { useEffect, useState } from "react";

let horas;
const BoasText = ({ nome }) => {
  console.log(nome);

  horas = new Date().getHours();

  if (horas >= 0 && horas < 12) {
    return <p className="boas">Good Morning, {nome ? nome : "Chef"}!</p>;
  } else if (horas >= 12 && horas < 18) {
    return <p className="boas">Good Afternoon, {nome ? nome : "Chef"}!</p>;
  } else if (horas >= 18 && horas < 24) {
    return <p className="boas">Good Night, {nome ? nome : "Chef"}!</p>;
  }
};

export default BoasText;
