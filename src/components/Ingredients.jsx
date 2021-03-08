import React, { useState, useEffect } from "react";

function Ingredients(ingredients) {
  return (
    <div>
      {ingredients.ingredients.split(",").map((ing) => {
        return <li>{ing}</li>;
      })}
    </div>
  );
}

export default Ingredients;
