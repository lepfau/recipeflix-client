import React, { useState, useEffect } from "react";
import FormCreate from "../components/Forms/FormCreate";
import apiHandler from "../api/apiHandler";
import Recipe from "../components/Recipe";

function Recipes(props) {
  const [recettes, setRecettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ail, setAil] = useState(false);
  const [citron, setCitron] = useState(false);
  const [creme, setCreme] = useState(false);
  const [temp, setTemp] = useState([]);

  function getAllRecipes() {
    apiHandler
      .getRecipes()
      .then((resp) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);

        setRecettes(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllRecipes();
  }, []);

  function handleChange(e) {
    console.log(e.target.name);
    if (e.target.checked && e.target.name === "ail") setAil(true);
    else if (!e.target.checked && e.target.name === "ail") setAil(false);
    if (e.target.checked && e.target.name === "citron") setCitron(true);
    else if (!e.target.checked && e.target.name === "citron") setCitron(false);
  }

  function handleReset() {
    setAil(false);
    setCitron(false);
    getAllRecipes();
  }

  const filtered = [...recettes];
  if (ail === true) {
    const filter = filtered
      .filter((rec) => rec.ingredients.includes("ail"))
      .map((rec) => rec);
    console.log(filter);
    setTemp(filter);
  }

  return (
    <div className="recettes">
      <h1 className="recettes-title">Les Recettes </h1>
      <div className="container">
        <div className="recipes-inputs">
          <input
            type="checkbox"
            id="ail"
            name="ail"
            checked={ail}
            onChange={handleChange}
          ></input>
          <label htmlFor="ail">Sans ail</label>
          <input
            type="checkbox"
            onChange={handleChange}
            id="citron"
            name="citron"
            checked={citron}
          ></input>
          <label htmlFor="citron">Sans citron</label>

          <button onClick={handleReset}>Reinitialiser filtres</button>
        </div>

        {loading ? (
          <img
            className="loading"
            src="https://i.gifer.com/LPxR.gif"
            alt="loading gif"
          />
        ) : (
          <div className="recipe-container">
            {recettes.map((recette) => {
              return (
                <Recipe
                  key={recette._id}
                  name={recette.name}
                  ingredients={recette.ingredients}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Recipes;
