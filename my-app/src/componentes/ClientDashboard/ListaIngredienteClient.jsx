import React, { useEffect, useState, useCallback } from "react";
import supabase from "../../supabaseClient";
import _ from "lodash";

const ListaIngredienteClient = () => {
  const [nomes, setNomes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [pesquisa, setPesquisa] = useState("");
  const [ingredientDetails, setIngredientDetails] = useState([]); // State to hold ingredient details

  async function getIngredient(userId) {
    try {
      const { data, error } = await supabase
        .from("Product_User")
        .select()
        .eq("iduser", userId);

      if (error) {
        throw error;
      }

      setNomes(data);
    } catch (error) {
      console.error("Error fetching ingredients:", error.message);
    }
  }

  async function getUser() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error fetching user session:", error.message);
      return;
    }

    if (data.session) {
      const userId = data.session.user.id;
      setUserId(userId);
      getIngredient(userId); // Call getIngredient with the userId
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  const getStatus = (dateExpire) => {
    const today = new Date();
    const expireDate = new Date(dateExpire);
    const diffTime = expireDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return <span style={{ color: "red" }}>Expired</span>;
    } else if (diffDays <= 7) {
      return <span style={{ color: "yellow" }}>Expiring</span>;
    } else {
      return <span style={{ color: "green" }}>Valid</span>;
    }
  };

  const getTheIngridentes = async (idPassado) => {
    try {
      const { data, error } = await supabase
        .from("Ingredients")
        .select("name, image") // Assuming 'image' is the column name for the image URL
        .eq("idingridients", idPassado)
        .single();

      if (data) {
        return { name: data.name, image: data.image }; // Return the name and image URL
      } else {
        console.warn(error);
        return { name: "", image: "" }; // Return an empty object if no data
      }
    } catch (error) {
      console.error("Error fetching ingredient details:", error.message);
      return { name: "", image: "" }; // Return an empty object in case of error
    }
  };

  const handleSearchChange = (e) => {
    setPesquisa(e.target.value);
    debouncedFetchIngredientDetails(e.target.value);
  };

  const fetchIngredientDetails = async (searchTerm) => {
    const filtered = nomes.filter(
      (nome) =>
        nome.unity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nome.quantity.toString().includes(searchTerm) ||
        nome.date_expire.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const details = await Promise.all(
      filtered.map((nome) => getTheIngridentes(nome.idIng))
    );

    setIngredientDetails(details);
  };

  const debouncedFetchIngredientDetails = useCallback(
    _.debounce(fetchIngredientDetails, 300),
    [nomes]
  );

  useEffect(() => {
    fetchIngredientDetails(pesquisa);
  }, [nomes]); // Trigger effect whenever nomes changes

  const filteredNomes = nomes.filter(
    (nome) =>
      nome.unity.toLowerCase().includes(pesquisa.toLowerCase()) ||
      nome.quantity.toString().includes(pesquisa) ||
      nome.date_expire.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="listaIngredienteBack"style={{ width: "100%", overflow: "scroll" }}>
      <div className="listaIngredienteClient" style={{ paddingBottom: 150 }}>
        <div>
          <h2>Filter your ingredients here :)</h2>
          <input
            type="text"
            placeholder="Example: Cake"
            id="SearchListaIngrediente"
            value={pesquisa}
            onChange={handleSearchChange}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Unity</th>
              <th>Quantity</th>
              <th>Expire Date</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredNomes.length === ingredientDetails.length && // Ensure synchronization
              filteredNomes.map((nome, index) => (
                <tr key={nome.id}>
                  <td>{nome.idIng}</td>
                  <td>{ingredientDetails[index]?.name}</td>{" "}
                  {/* Render ingredient name from state */}
                  <td>
                    <img
                      src={ingredientDetails[index]?.image}
                      alt="Ingredient"
                    />
                  </td>
                  <td>{nome.unity}</td>
                  <td>{nome.quantity}</td>
                  <td>{nome.date_expire}</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                    </svg>
                  </td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>
                  </td>
                  <td>{getStatus(nome.date_expire)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaIngredienteClient;
