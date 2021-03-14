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
    </div>
  );
}

export default OneRecipe;
