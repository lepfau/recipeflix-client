import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
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
    />
  );
}

export default Recipe;
