import NavBar from "../NavBar";
import "../../estilos/IngredientsListPage.css";
import { SearchInput } from "../SearchInput";
import BasicEditingGrid from "./List";
import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

const IngredientsListPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from Supabase
        const { data: fetchedData, error } = await supabase
          .from("Category_Ingredients")
          .select();

        if (error) {
          throw error;
        }

        // Set fetched data to state
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    // Call fetchData function
    fetchData();
  }, []);

  return (
    <>
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
        <div>
          <h2>Data from Supabase:</h2>
          {data.map((item) => (
            <div key={item.id}>
              <p>ID: {item.idcategory}</p>
              <p>Name: {item.name}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default IngredientsListPage;
