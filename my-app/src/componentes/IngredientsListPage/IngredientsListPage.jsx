import NavBar from "../NavBar";
import "../../estilos/IngredientsListPage.css";
import { SearchInput } from "../SearchInput";
import BasicEditingGrid from "./List";

const IngredientsListPage = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="ingredients-list-main">
        <div className="ingredients-list">
          <div className="ingredients-list-titles">
            <h2>Ingredients List</h2>
            <p>Your Ingredients</p>
          </div>

          <div className="search-div">
            <SearchInput />
          </div>
        </div>
        <div className="ingredients-itens">
          <BasicEditingGrid
            columns={[{ field: "id" }, { field: "name", editable: true }]}
          />
        </div>
      </main>
    </>
  );
};

export default IngredientsListPage;
