import React from "react";
import "./RecipesDetails.css";

const RecipeDetails = () => {
	return (
			<main>
				<div className="ViewRecipePage">
					<div class="Recipe">
						<figure>
							<img
								src="https://wallpaperaccess.com/full/767093.jpg"
								alt=""
							/>
						</figure>
                        <div>
                            <h2>Titulo Receita</h2>
                            <p>Descrição</p>
                        </div>
					</div>
				</div>
			</main>
	);
};

export default RecipeDetails;
