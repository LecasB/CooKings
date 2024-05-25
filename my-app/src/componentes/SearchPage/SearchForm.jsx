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

  //const [categoriasUser, setCategoriasUser] = useState([]);
  const [categoriasForm, setCategoriasForm] = useState([]);

  const [tagsForm, setTagsForm] = useState([]);

  const abrir = () => {
    if (open && mediaQuery) {
      document.getElementById("searchform").style.display = "flex";
    }
    if (!open && mediaQuery) {
      document.getElementById("searchform").style.display = "none";
    }
    setOpen(!open);
  };

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
        Filtros
      </button>
      <div className="searchform" id="searchform">
        <div className="searchform-input">
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
