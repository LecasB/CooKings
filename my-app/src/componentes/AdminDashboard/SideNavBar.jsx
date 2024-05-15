import Logo from "../../imagens/cooKingsImagev1.png";
import "../../estilos/SideNavBar.css";
import { Link } from "react-router-dom";

const SideNavBar = () => {
  return (
    <nav className="sidenavbar">
      <ul>
        <li>
          <div>
            <Link> Dashborad </Link>
          </div>
        </li>

        <li>
          <div>
            <Link to="NovoIngrediente"> New Ingridient </Link>
          </div>
        </li>

        <li>
          <div>
            <Link to="NovaReceita"> New Recipe </Link>
          </div>
        </li>

        <li>
          <div>
            <Link to="ListaIngridiente"> Ingridients List </Link>
          </div>
        </li>

        <li>
          <div>
            <Link to="ListaReceitas"> Recipes List</Link>
          </div>
        </li>

        <li>
          <div>
            <Link to="NovaCategoriaIngrediente">
              {" "}
              New Ingredient's Category{" "}
            </Link>
          </div>
        </li>

        <li>
          <div>
            <Link to="NovaCategoriaReceita"> New Recipe's Category </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SideNavBar;
