import Logo from "../../imagens/cooKingsImagev1.png";
import "../../estilos/SideNavBar.css";
import { Link } from "react-router-dom";

const SideNavBar = () => {
  return (
    <nav className="sidenavbar">
      <ul>
        <li>
          <Link to="/AdminDashboardPage/"> Dashboard </Link>
        </li>

        <li>
          <Link to="NovoIngrediente"> New Ingridient </Link>
        </li>

        <li>
          <Link to="NovaReceita"> New Recipe </Link>
        </li>

        <li>
          <Link to="ListaIngridiente"> Ingridients List </Link>
        </li>

        <li>
          <Link to="ListaReceitas"> Recipes List</Link>
        </li>

        <li>
          <Link to="NovaCategoriaIngrediente"> New Ingredient's Category </Link>
        </li>

        <li>
          <div>
            <Link to="NovaCategoriaReceita"> New Recipe's Category </Link>
          </div>
        </li>
        <li>
          <Link to="AprovarReceita"> Aprove Recipe </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavBar;
