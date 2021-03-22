import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";

function OneRecipe(props) {
  const [oneRecipe, setoneRecipe] = useState([]);

  useEffect(() => {
    apiHandler
      .getOneRecipe(props.match.params.id)
      .then((resp) => {
        setoneRecipe(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>{oneRecipe.name}</h1>
      <img src={oneRecipe.image} alt="img" />
      {oneRecipe.ingredients
        ? oneRecipe.ingredients.map((ing, index) => {
            return (
              <div className="ingredient" key={index}>
                <p>{ing[0].toUpperCase() + ing.substring(1)}</p>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default OneRecipe;
