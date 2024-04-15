import React from "react";
import NavBar from "../NavBar";
import "../../estilos/EditRecipePage.css";
import { BackArrow } from "../../imagens/svgs";
import dropImage from "../../imagens/dropImage.PNG";

const EditRecipePage = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className="EditRecipePage">
        
          <div>
            <button className="BackEditRecipe">
              <BackArrow />
              <span>Back</span>
            </button>
          </div>
          <form className="EditForm">
            <div className="LeftForm">
                <label htmlFor="">Recipe Name</label>
                <input type="text" placeholder="Type here..." />
                <label htmlFor="">Description</label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Type here..."
                ></textarea>
                <label htmlFor="">Category</label>
                <select name="" id="">
                  <option value="" selected disabled hidden>
                    Choose here
                  </option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Drink">Drink</option>
                  <option value="Snack">Snack</option>
                </select>
                <label htmlFor="">Tag</label>
                <textarea name="" id="TagsArea" cols="30" rows="10" placeholder="Add tag"></textarea>
            </div>

            <div className="RightForm">´
            <div>
              <img
                id="RecipeImage"
                src="https://images.alphacoders.com/276/276861.jpg"
                alt="Recipe Image"
              />
              <label htmlFor="">Product Gallery</label>
              <input src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" id="PutImage" type="image"/>
              </div>
            </div>
          </form>
        
      </main>
    </>
  );
};

export default EditRecipePage;
