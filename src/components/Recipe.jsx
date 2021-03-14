import React from "react";
import { NavLink } from "react-router-dom";

function Recipe(recette) {
  return (
    <div key={recette._id} className="recipe-card">
      <h3>{recette.name}</h3>
      <img style={{ height: "150px" }} src={recette.image} alt="recimag" />
      <NavLink exact to={`/recipes/${recette.id}`}>
        Details
      </NavLink>
    </div>
  );
}

export default Recipe;
