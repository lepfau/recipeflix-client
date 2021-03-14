import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import Recipe from "../components/Recipe";

function Recipes(props) {
  const [recettes, setRecettes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [vegan, setVegan] = useState(false);

  useEffect(() => {
    apiHandler
      .getRecipes()
      .then((resp) => {
        setRecettes(resp);
        setFiltered(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (vegan) {
      const filter = filtered.filter((rec) => rec.vegan === true);
      setRecettes(filter);
    } else {
      setRecettes(filtered);
    }
  }, [vegan]);

  function handleChange(event) {
    event.target.checked ? setVegan(true) : setVegan(false);
  }

  return (
    <div className="recettes">
      <h1 className="recettes-title">Les Recettes </h1>
      <input
        type="checkbox"
        checked={vegan}
        name="vegan"
        onChange={handleChange}
      ></input>
      <div className="container">
        <div className="recipe-container">
          {recettes.map((recette) => {
            return (
              <Recipe
                key={recette._id}
                name={recette.name}
                image={recette.image}
                id={recette._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Recipes;
