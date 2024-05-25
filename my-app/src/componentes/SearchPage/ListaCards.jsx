import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";

const ListaCards = ({ categoriasUser, tagsUser, inputValue }) => {
  const [item, setItem] = useState([]);

  const [parar, setParar] = useState(false);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(12);

  const getItems = async () => {
    // 1º pedido
    let query = supabase.from("Recipes").select("*");

    if (categoriasUser.length > 0) {
      query = query.in("idcategory", categoriasUser);
    }

    if (tagsUser.length > 0) {
      query = query.overlaps("idtags", tagsUser);
    }

    if (inputValue || inputValue != " ") {
      query = query.ilike("name", `%${inputValue}%`); // por motivos que apenas deus sabe eu n posso colocar apenas inputValue, tem que ser obrigatoriamente `%${inputValue}%` 😢
    }

    query = query.order("idrecipe", { ascending: false }).range(min, max);

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
    console.log("aquii");
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
      setMin(min - 13);
      setMax(max - 12);
    } else {
      setMin(min + 13);
      setMax(max + 12);
    }
  }

  return (
    <div className="list-cards">
      <div id="card-section">
        {item.map((card) => (
          <div className="card-procurar">
            <figure className="cont-img-procurar">
              <img src={card.image} alt="" />
            </figure>
            <div className="cont">
              <div className="cont-text">
                <h2 style={{ maxWidth: 140 }}>{card.name}</h2>
                <p>{card.description}</p>
              </div>

              <div className="cont-actions-procurar">
                <button>View</button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
                </svg>
              </div>
            </div>
          </div>
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
