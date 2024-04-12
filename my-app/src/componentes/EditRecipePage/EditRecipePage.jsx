import React from "react";
import NavBar from "../NavBar";
import "../../estilos/EditRecipePage.css";
import { BackArrow } from "../../imagens/svgs";

const EditRecipePage = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className="EditRecipePage">
        <div>
          <div>
            <button className="BackEditRecipe">
              <BackArrow />
              <span>Back</span>
            </button>

            <div>
              <div>
                <form action="">
                  <label htmlFor="">Recipe Name</label>
                  <input type="text" />
                  <label htmlFor="">Description</label>
                  <textarea name="" id="" cols="30" rows="10"></textarea>
                  <label htmlFor="">Category</label>
                  <select name="" id=""></select>
                  <label htmlFor="">Tag</label>
                  <textarea name="" id="" cols="30" rows="10"></textarea>
                </form>
              </div>

              <div></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EditRecipePage;
