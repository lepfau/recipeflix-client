import React from "react";
import RecipeCard from "./RecipeCard";

function Recipe(recette) {
  return (
    <RecipeCard
      id={recette.id}
      image={recette.image}
      key={recette._id}
      name={recette.name}
      type={recette.type}
      temps={recette.temps}
      ratings={recette.ratings}
    />
  );
}

export default Recipe;
