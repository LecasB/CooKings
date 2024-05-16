import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";

const ListaCards = () => {
  const [item, setItem] = useState([]);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5);

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
  }, [max]);

  // no onclick de uma pagina
  // faz o setCurrentOffset(pagina - 1 * 10 )

  function updateList(update) {
    if (update) {
      setMin(min - 6);
      setMax(max - 5);
    } else {
      setMin(min + 6);
      setMax(max + 5);
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
        {min > 0 && <button onClick={() => updateList(true)}>trás</button>}
        {item.length > 0 && (
          <button onClick={() => updateList(false)}>Frente</button>
        )}
      </div>
    </div>
  );
};

export default ListaCards;
