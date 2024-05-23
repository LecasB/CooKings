import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";

const ListaCards = ({ categoriasUser, tagsUser }) => {
  const [item, setItem] = useState([]);

  const [parar, setParar] = useState(false);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(12);

  //const [categoriasUser, setCategoriasUser] = useState([]);

  const [frase, setFrase] = useState("");

  useEffect(() => {
    let stringCompleta = "";

    stringCompleta = categoriasUser.join(" && ");

    setFrase(stringCompleta);
    console.log(stringCompleta);
    console.log(frase);
  }, [categoriasUser]);

  const getItems = async () => {
    // 1º pedido
    const { data, error } = await supabase
      .from("Recipes")
      .select("*")
      .order("idrecipe", { ascending: false })
      .range(min, max);

    if (data) {
      setItem(data);
    } else {
      console.log("error");
    }
  };

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
