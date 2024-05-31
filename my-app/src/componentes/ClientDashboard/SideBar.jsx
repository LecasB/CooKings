import Logo from "../../imagens/cooKingsImagev1.png";
import "../../estilos/SideNavBar.css";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <nav className="sidenavbar">
      <ul>
        <li>
          <Link to="/ClientDashboard/"> Dashboard </Link>
        </li>

        <li>
          <Link to="NovaReceitaClient"> New Recipe </Link>
        </li>

        <li>
          <Link to="ListaIngredienteClient"> My Ingriedients </Link>
        </li>

        <li>
          <Link to="NovoIngredienteClient"> Add Ingridient </Link>
        </li>

        <li>
          <Link to="FavoritosClient"> My Favourites </Link>
        </li>
        <li>
          <Link to="UserPage"> My Profile </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
