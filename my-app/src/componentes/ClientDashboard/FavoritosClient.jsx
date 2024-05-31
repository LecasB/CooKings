import react from "react";
import supabase from "../../supabaseClient";
import { useEffect, useState } from "react";
import CardProcurar from "../CardProcurar";
import "./ClienteDashboard.css";

const FavoritosClient = () => {
  const [items, setItems] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  const verificarUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error);
      setUserId(null);
    } else if (data.user) {
      setUserId(data.user.id);
      setUser(data.user);
      console.log("User ID:", data.user.id);
    }
  };

  const getItems = async (userId) => {
    const { data, error } = await supabase
      .from("User_Favourites")
      .select("idRecipes")
      .eq("idUser", userId);

    if (error) {
      console.error("Error fetching items:", error);
    } else {
      const valores = data.map((item) => item.idRecipes);
      /* console.log(valores); */
      setItems(valores);
      console.log("Items:", valores);
    }
  };

  useEffect(() => {
    verificarUser();
  }, []);

  useEffect(() => {
    console.log(items);
    if (userId) {
      getItems(userId);
    }
  }, [userId]);

  const getFavoritos = async (item) => {
    const { data, error } = await supabase
      .from("Recipes")
      .select("*")
      .in("idrecipe", item);

    if (error) {
      console.error("Error fetching favoritos:", error);
    } else {
      setFavoritos(data);
      console.log("Favoritos:", data);
    }
  };

  useEffect(() => {
    if (items.length > 0) {
      getFavoritos(items);
    }
  }, [items]);

  return (
    <div
    className="userFavoritos"
      style={{
        width: 100 + "%",
        padding: "10px 10px 150px 10px",
        overflow: "scroll",
      }}
    >
      <div
        className="favoritosClient"
        style={{ flexDirection: "column", overflow: "auto" }}
      >
        <div>
          <h2>Favoritos :)</h2>
          <input
            type="text"
            placeholder="Example: Francesinha"
            id="SearchListaIngrediente"
          />
        </div>

        <div className="NormalProdCard">
          {favoritos.map((card) => (
            <CardProcurar
              titulo={card.name}
              texto={card.description}
              image={card.image}
              iduser={user ? user : null}
              id={card.idrecipe}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritosClient;
