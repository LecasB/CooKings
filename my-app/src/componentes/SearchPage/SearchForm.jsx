import React, { useEffect, useState } from "react";
import "../../estilos/SearchForm.css";
import { SearchInput } from "../SearchInput";
import supabase from "../../supabaseClient";

const SearchForm = ({
  categoriasUser,
  setCategoriasUser,
  tagsUser,
  setTagsUser,
  inputValue,
  setInputValue,
}) => {
  const [open, setOpen] = useState(false);
  let mediaQuery = window.matchMedia("(max-width: 1030px)");

  const abrir = () => {
    if (open && mediaQuery) {
      document.getElementById("searchform").style.display = "flex";
    }
    if (!open && mediaQuery) {
      document.getElementById("searchform").style.display = "none";
    }
    setOpen(!open);
  };

  //const [categoriasUser, setCategoriasUser] = useState([]);
  const [categoriasForm, setCategoriasForm] = useState([]);

  const [tagsForm, setTagsForm] = useState([]);

  const categorias = async () => {
    const { data, error } = await supabase.from("Category_Recipes").select("*");

    if (data) {
      setCategoriasForm(data);
    } else {
      console.log("error");
    }
  };

  const tags = async () => {
    const { data, error } = await supabase.from("Tags").select("*");

    if (data) {
      setTagsForm(data);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    categorias();
    tags();
  }, []);

  return (
    <>
      <button className="openCategorias" onClick={() => abrir(!open)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
        </svg>
      </button>
      <div className="searchform" id="searchform">
        <div className="searchform-input">
          <button className="close-b" onClick={() => abrir(!open)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </button>
          <SearchInput inputValue={inputValue} setInputValue={setInputValue} />
        </div>
        <div>
          <hr />
        </div>
        {categoriasForm.map((cat) => (
          <div className="item-container">
            <input
              type="checkbox"
              name={cat.name}
              id={cat.name}
              onClick={() => {
                if (categoriasUser.includes(cat.idcategory)) {
                  setCategoriasUser(
                    categoriasUser.filter((id) => id !== cat.idcategory)
                  );
                } else {
                  setCategoriasUser([...categoriasUser, cat.idcategory]);
                }
              }}
            />
            <label for={cat.name}>{cat.name}</label>
          </div>
        ))}
        <div>
          <hr />
        </div>
        <div className="search-ingredients-list">
          {tagsForm.map((ing) => (
            <div className="item-container">
              <input
                type="checkbox"
                name={ing.tag}
                id={ing.tag}
                onClick={() => {
                  if (tagsUser.includes(ing.idTag)) {
                    setTagsUser(tagsUser.filter((id) => id !== ing.idTag));
                  } else {
                    setTagsUser([...tagsUser, ing.idTag]);
                  }
                }}
              />
              <label for={ing.tag}>{ing.tag}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchForm;
