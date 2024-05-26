import RecipeDetails from "./RecipesDetails";
import CardProcurar from "../CardProcurar";
import "../../estilos/ViewRecipePage.css";


const ViewRecipePage = () => {
	return (
		<main>
			<div className="ViewRecipePage">
				<RecipeDetails></RecipeDetails>

				<div className="Recommended">
					<h3>Recommended Recipes</h3>
					<div className="boxcard">
						<CardProcurar titulo={"titulo"} texto={"Descrição"} />
						<CardProcurar titulo={"titulo"} texto={"Descrição"} />
						<CardProcurar titulo={"titulo"} texto={"Descrição"} />
						<CardProcurar titulo={"titulo"} texto={"Descrição"} />
					</div>
				</div>
			</div>
		</main>
	);
};

export default ViewRecipePage;
