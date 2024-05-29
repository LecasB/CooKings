import react, { useEffect, useState } from "react";
import "./CardsDashboard.css";
import supabase from "../../supabaseClient";

const ClientDashboard = () => {
  const [produtos, setProdutos] = useState([]);
  const [userId, setUserId] = useState(null);
  const [expire, setExpire] = useState(0);
  const [expiring, setExpiring] = useState(0);
  const [valid, setValid] = useState(0);
  const [fav, setFav] = useState(0);

  const getUser = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error fetching user session:", error.message);
      return;
    }

    if (data.session) {
      const userId = data.session.user.id;
      setUserId(userId);
      getIngredient(userId);
      countFavorites(userId);
    }
  };

  const getIngredient = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("Product_User")
        .select()
        .eq("iduser", userId);

      if (error) {
        throw error;
      }

      setProdutos(data);
      countStatuses(data);
    } catch (error) {
      console.error("Error fetching ingredients:", error.message);
    }
  };

  const countFavorites = async (userId) => {
    const { data, error } = await supabase
      .from("User_Favourites")
      .select()
      .eq("idUser", userId);

    if (data) {
      setFav(data.length);
    } else {
      console.error("erro:", error.message);
    }
  };

  const countStatuses = (products) => {
    let expiredCount = 0;
    let expiringCount = 0;
    let validCount = 0;

    products.forEach((product) => {
      const today = new Date();
      const expireDate = new Date(product.date_expire);
      const diffTime = expireDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays < 0) {
        expiredCount++;
      } else if (diffDays <= 7) {
        expiringCount++;
      } else {
        validCount++;
      }
    });

    setExpire(expiredCount);
    setExpiring(expiringCount);
    setValid(validCount);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div id="client-dashboard">
      <h1>Welcome! :)</h1>
      {/* <h3>You have {expire} Ingredients Expired</h3>
      <h3>You have {expiring} Ingredients Expiring</h3>
      <h3>You have {valid} Ingredients Valid</h3>
      <h3>You got {fav} favourites</h3>
      <h3>You have {produtos.length} Ingredients</h3> */}
      <div className="cards-display">
        <div className="card-clientdashboard-expire">
          <div className="card-clientdashboard-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                fill="#e80000"
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              />
            </svg>
          </div>
          <div className="card-clientdashboard-text">
            <p className="card-clientdashboard-p">Ingredients Expired: </p>
            <p className="card-clientdashboard-total">{expire}</p>
          </div>
        </div>

        <div className="card-clientdashboard-expiring">
          <div className="card-clientdashboard-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="#ffaf36"
                d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
              />
            </svg>
          </div>
          <div className="card-clientdashboard-text">
            <p className="card-clientdashboard-p">Ingredients Expiring: </p>
            <p className="card-clientdashboard-total">{expiring}</p>
          </div>
        </div>

        <div className="card-clientdashboard-valid">
          <div className="card-clientdashboard-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="#45cf5c"
                d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
              />
            </svg>
          </div>
          <div className="card-clientdashboard-text">
            <p className="card-clientdashboard-p">Ingredients Valid: </p>
            <p className="card-clientdashboard-total">{valid}</p>
          </div>
        </div>

        <div className="card-clientdashboard-fav">
          <div className="card-clientdashboard-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                fill="#FFD43B"
                d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"
              />
            </svg>
          </div>
          <div className="card-clientdashboard-text">
            <p className="card-clientdashboard-p">Favorites: </p>{" "}
            <p className="card-clientdashboard-total">{fav}</p>
          </div>
        </div>

        <div className="card-clientdashboard">
          <div className="card-clientdashboard-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                fill="#e80000"
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
              />
            </svg>
          </div>
          <div className="card-clientdashboard-text">
            <p className="card-clientdashboard-p">Total Ingredients: </p>
            <p className="card-clientdashboard-total">{produtos.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
