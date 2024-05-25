import React, { useEffect, useState } from 'react';
import supabase from '../../supabaseClient';

const ListaIngredienteClient = () => {

    const [nomes, setNomes] = useState([]);
    const [userId, setUserId] = useState(null);

    async function getIngredient(userId) {
        try {
            const { data, error } = await supabase
                .from("Product_User")
                .select()
                .eq('iduser', userId);

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

    return (
        <div>
            <h1>Ingredients:</h1>
            {nomes.map((nome) => (
                    <div key={nome.id}>
                        <h1>{nome.idIng}</h1>
                        <h2>{nome.unity}</h2>
                        <h2>Quantidade: {nome.quantity}</h2>
                        <h2>Expire Date: {nome.date_expire}</h2>
                        <hr></hr>
                    </div>
                    ))}
        </div>
    );
}

export default ListaIngredienteClient;
