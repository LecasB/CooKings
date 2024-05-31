import React, { useRef } from "react";
import "../../estilos/EditRecipePage.css";
import TagsArea from "../TagsArea";

const EditRecipePage = () => {
  const fileInputRef = useRef();
  const imageRef = useRef();

  const handleDrop = (evento) => {
    evento.preventDefault();
    const files = evento.dataTransfer.files;
    if (files.length) {
      let reader = new FileReader();
      reader.onload = (evento) => {
        if (imageRef.current) {
          imageRef.current.src = evento.target.result;
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleDragOver = (evento) => {
    evento.preventDefault();
  };

  const handleFileChange = (evento) => {
    const files = evento.target.files;
    if (files.length) {
      let reader = new FileReader();
      reader.onload = (evento) => {
        if (imageRef.current) {
          imageRef.current.src = evento.target.result;
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
            <label htmlFor="">Recipe Name</label>
            <input id="recipeName" type="text"/>
            <label htmlFor="">Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
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
            <TagsArea></TagsArea>
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
            <div className="buttonContainer">
              <button id="saveButton" className="button">
                SAVE
              </button>
              <button id="deleteButton" className="button">
                CANCEL
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default EditRecipePage;
