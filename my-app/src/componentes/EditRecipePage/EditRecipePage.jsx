import React, { useRef } from "react";
import NavBar from "../NavBar";
import "../../estilos/EditRecipePage.css";
import { BackArrow } from "../../imagens/svgs";

const EditRecipePage = () => {
  const fileInputRef = useRef();
  const imageRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      let reader = new FileReader();
      reader.onload = (e) => {
        if (imageRef.current) {
          imageRef.current.src = e.target.result;
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length) {
      let reader = new FileReader();
      reader.onload = (e) => {
        if (imageRef.current) {
          imageRef.current.src = e.target.result;
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <>
      <main className="EditRecipePage">
        <form className="EditForm">
          <div className="LeftForm">
            <div>
              <button className="BackEditRecipe">
                <BackArrow />
                <span>Back</span>
              </button>
            </div>
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
            <textarea
              name=""
              id="TagsArea"
              cols="30"
              rows="10"
              placeholder="Add tag"
            ></textarea>
          </div>

          <div className="RightForm">
            <div>
              <img
                ref={imageRef}
                id="RecipeImage"
                src="https://images.alphacoders.com/276/276861.jpg"
                alt="Recipe Image"
              />
            </div>
            <label>Product Gallery</label>
            <label
              htmlFor="fileInput"
              id="PutImage"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <span id="DropImageTitle">Drop your image here, or browse</span>
              <div>
                <input
                  ref={fileInputRef}
                  id="fileInput"
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={handleFileChange}
                />
              </div>
            </label>
          </div>
        </form>
      </main>
    </>
  );
};

export default EditRecipePage;
