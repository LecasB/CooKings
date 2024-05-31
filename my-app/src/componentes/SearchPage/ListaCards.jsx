import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import CardProcurar from "../CardProcurar";

const ListaCards = ({ categoriasUser, tagsUser, inputValue }) => {
  const [item, setItem] = useState([]);

  const [parar, setParar] = useState(false);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(11);

  const [user, setUser] = useState();

  const verificarlogin = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
    console.log("User: ");
    console.warn(user);
  };

  useEffect(() => {
    verificarlogin();
  }, []);

  const getItems = async () => {
    // 1º pedido
    let query = supabase.from("Recipes").select("*");

    if (categoriasUser.length > 0) {
      query = query.in("idcategory", categoriasUser);
    }

    if (tagsUser.length > 0) {
      query = query.overlaps("idtags", tagsUser);
    }

    if (inputValue) {
      query = query.ilike("name", `%${inputValue}%`); // por motivos que apenas deus sabe eu n posso colocar apenas inputValue, tem que ser obrigatoriamente `%${inputValue}%` 😢
    }

    query = query
      .eq("state", true)
      .order("idrecipe", { ascending: false })
      .range(min, max);

    const { data, error } = await query;

    if (data) {
      setItem(data);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    getItems();
  }, [categoriasUser]);

  useEffect(() => {
    getItems();
  }, [inputValue]);

  useEffect(() => {
    getItems();
  }, [localStorage]);

  useEffect(() => {
    getItems();
  }, [tagsUser]);

  useEffect(() => {
    console.log(item);
  }, [item]);

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    getItems();

    if (item.length < max - min) {
      setParar(false);
    } else {
      setParar(true);
    }
  }, [max]);

  // no onclick de uma pagina
  // faz o setCurrentOffset(pagina - 1 * 10 )

  function updateList(update) {
    if (update) {
      setMin(min - 12);
      setMax(max - 11);
    } else {
      setMin(min + 12);
      setMax(max + 11);
    }
  }

  return (
    <div className="list-cards">
      <div id="card-section">
        {item.map((card) => (
          <CardProcurar
            titulo={card.name}
            texto={card.description}
            image={card.image}
            iduser={user ? user : null}
            id={card.idrecipe}
          />
        ))}
      </div>

      <div className="search-b-navigation">
        {min > 0 && (
          <button className="loginButton " onClick={() => updateList(true)}>
            Back
          </button>
        )}
        {item.length > 0 && parar == false && (
          <button className="loginButton " onClick={() => updateList(false)}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ListaCards;
