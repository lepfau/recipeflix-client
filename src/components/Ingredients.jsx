import React, { useState, useEffect } from "react";

function Ingredients(ingredients) {
  return (
    <div>
      {ingredients.ingredients.map((ing) => {
        return <li key={ing._id}>{ing}</li>;
      })}
    </div>
  );
}

export default Ingredients;
