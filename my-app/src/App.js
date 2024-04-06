import logo from "./logo.svg";
import CardInicial from "./componentes/CardInicial";
import "./App.css";
import LoginForm from "./componentes/LoginPage/LoginForm";
import NavBar from "./componentes/NavBar";
import CardProcurar from "./componentes/CardProcurar";

function App() {
  return (
    <div className="App">
      <header>
      <NavBar />
      </header>
      <div className="body">
      <div className="box">
        <h2>Recommended for you</h2>
        <div className="boxcard">
          <CardInicial titulo={"Titilo 1"} texto={"texto 1"} />
          <CardInicial titulo={"Titilo 2"} texto={"texto 2"} />
          <CardInicial titulo={"Titilo 3"} texto={"texto 3"} />
        </div>
       <LoginForm></LoginForm>
      </div>

      <div className="box">
        <h2>Recently added</h2>
        <div className="boxcard">
          <CardInicial titulo={"Titilo 4"} texto={"texto 4"} />
          <CardInicial titulo={"Titilo 5"} texto={"texto 5"} />
          <CardInicial titulo={"Titilo 6"} texto={"texto 6"} />
        </div>
      </div>

      <div className="box">
        <h2>Procurar</h2>
        <div className="boxcard">
          <CardProcurar titulo={"Titilo 4"} texto={"texto 4"} />
          <CardProcurar titulo={"Titilo 5"} texto={"texto 5"} />
          <CardProcurar titulo={"Titilo 6"} texto={"texto 6"} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
