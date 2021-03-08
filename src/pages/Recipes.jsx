import React, { useState, useEffect } from "react";
import FormCreate from "../components/Forms/FormCreate";
import apiHandler from "../api/apiHandler";

function Recipes() {
  const [recettes, setRecettes] = useState([]);

  useEffect(() => {
    apiHandler
      .getRecipes()
      .then((resp) => {
        setRecettes(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1 className="recettes-title">Les Recettes </h1>
      {recettes.map((recette) => {
        return <div></div>;
      })}
    </div>
  );
}

export default Recipes;
