import React, { useEffect, useState } from 'react';
import supabase from "../supabaseClient"

const CategoriesChoice = () => {

    const [categorias, setCategorias] = useState([]);
    const [tags, setTags] = useState([]);

    const getCategorias = async () => {
        try {
          const { data: categoriasData, error: categoriasError } = await supabase.from("Category_Recipes").select();
          const { data: tagsData, error: tagsError } = await supabase.from("Tags").select();
      
          if (categoriasError || tagsError) {
            throw categoriasError || tagsError;
          }
      
          setCategorias(categoriasData);
          setTags(tagsData);
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };

      useEffect(() => {
        getCategorias();
      }, []);

    return (
        <div>
            <div id="part1">
                <h1>Bem-vindo ao CooKings!</h1>
                <h2>Estamos entusiasmados por tê-lo aqui. Para lhe oferecermos as melhores receitas, gostaríamos de saber as suas preferências culinárias.</h2>
                <h3>Vamos começar esta deliciosa jornada juntos!</h3>
                <button>Next</button>
            </div>
            <div id="part2">
                <h1>Escolha Pelo Menos 3 Categorias</h1>
                {categorias.map((categoria) => (
                    <div key={categoria.idcategory}>
                        <label htmlFor={categoria.idcategory}>{categoria.name}</label>
                        <input type="checkbox" name="categorias" id={categoria.idcategory}/>
                    </div>
                ))}
                <button>Next</button>
            </div>
            <div id="part3">
                <h1>Escolha Pelo Menos 3 Tags</h1>
                {tags.map((tag) => (
                    <div key={tag.idTag}>
                        <label htmlFor={tag.idTag}>{tag.tag}</label>
                        <input type="checkbox" name="tags" id={tag.idTag}/>
                    </div>
                ))}
                <button>Next</button>
            </div>
        </div>     
    )
}

export default CategoriesChoice;
