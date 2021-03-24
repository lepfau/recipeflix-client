import React from "react";
import { NavLink } from "react-router-dom";

function Recipe(recette) {
  let image = recette.image;

  return (
    <NavLink exact to={`/recipes/${recette.id}`}>
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "0 0",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        key={recette._id}
        className="recipe-card"
      >
        <h3>{recette.name}</h3>
        <div>
          <p className="recipetype">{recette.type}</p>
          <p>
            <i class="far fa-clock"></i> {recette.temps} min
          </p>
        </div>
      </div>
    </NavLink>
  );
}

export default Recipe;
