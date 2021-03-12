import React from "react";
import Ingredients from "./Ingredients";

function Recipe(recette) {
  return (
    <div key={recette.name} className="recipe-card">
      <h3>{recette.name}</h3>

      <img style={{ height: "150px" }} src={recette.image} alt="recimag" />
    </div>
  );
}

export default Recipe;
