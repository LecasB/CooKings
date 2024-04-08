import logo from "./logo.svg";
import CardInicial from "./componentes/CardInicial";
import "./App.css";
import LoginForm from "./componentes/LoginPage/LoginForm";
import NavBar from "./componentes/NavBar";
import CardProcurar from "./componentes/CardProcurar";
import recipe from "./componentes/ArrayInfo";
import ListaCard from "./componentes/ListaCards";
import SearchForm from "./componentes/SearchPage/SearchForm";
import MenuTeste from "./componentes/MenuTeste";

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <MenuTeste />
      <div className="body">
        <div className="box">
          <h2>Recommended for you</h2>
          <div className="boxcard">
            <ListaCard dados={recipe} />
          </div>
          <LoginForm></LoginForm>
          <SearchForm />
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
