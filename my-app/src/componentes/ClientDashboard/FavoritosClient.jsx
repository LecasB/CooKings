import react from 'react';
import supabaseClient from '../../supabaseClient';
import { useEffect, useState } from 'react';

const FavoritosClient = () =>{
    return (
        <div className='favoritosClient'>
            <div>
        <h2>Favoritos :)</h2>
        <input 
            type='text' 
            placeholder='Example: Francesinha' 
            id="SearchListaIngrediente" 
            
        />
        </div>
    </div>

    )
}

export default FavoritosClient;