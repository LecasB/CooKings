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
    <div>
      <h1>Welcome! :)</h1>
      <h3>You have {expire} Ingredients Expired</h3>
      <h3>You have {expiring} Ingredients Expiring</h3>
      <h3>You have {valid} Ingredients Valid</h3>
      <h3>You got {fav} favourites</h3>
      <h3>You have {produtos.length} Ingredients</h3>
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
          <p className="card-clientdashboard-p">Ingredients Expired: </p>{" "}
          <p className="card-clientdashboard-total">{expire}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
