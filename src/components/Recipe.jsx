import React from "react";
import Ingredients from "./Ingredients";

function Recipe(recette) {
  return (
    <div key={recette.name} className="recipe-card">
      <h3>Nom: {recette.name}</h3>
      <h3>
        Ingredients: <Ingredients ingredients={recette.ingredients} />
      </h3>
    </div>
  );
}

export default Recipe;
