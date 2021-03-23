import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import Recipe from "../components/Recipe";
import Searchbar from "../components/Searchbar";

function Recipes(props) {
  const [recettes, setRecettes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [vegan, setVegan] = useState(false);
  const [vegetarien, setVegetarien] = useState(false);
  const [lactose, setLactose] = useState(false);
  const [gluten, setGluten] = useState(false);
  const [loading, setLoading] = useState(true);

  function handlefilter(resp) {
    if (vegan)
      setRecettes(
        resp.filter(
          (rec) =>
            rec.vegan === true ||
            rec.lactose === true ||
            rec.vegetarian === true
        )
      );
    else if (vegetarien && gluten)
      setRecettes(
        resp.filter((rec) => rec.gluten === true && rec.vegetarian === true)
      );
    else if (vegetarien && lactose)
      setRecettes(
        resp.filter((rec) => rec.lactose === true && rec.vegetarian === true)
      );
    else if (vegetarien && lactose && gluten)
      setRecettes(
        resp.filter(
          (rec) =>
            rec.lactose === true &&
            rec.vegetarian === true &&
            rec.gluten === true
        )
      );
    else if (lactose && gluten)
      setRecettes(
        resp.filter((rec) => rec.lactose === true && rec.gluten === true)
      );
    else if (vegetarien)
      setRecettes(resp.filter((rec) => rec.vegetarian === true));
    else if (lactose) setRecettes(resp.filter((rec) => rec.lactose === true));
    else if (gluten) setRecettes(resp.filter((rec) => rec.gluten === true));
    else setRecettes(resp);
  }

  useEffect(() => {
    apiHandler
      .getRecipes()
      .then((resp) => {
        handlefilter(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [vegan, vegetarien, lactose, gluten]);

  function handleChange(event, filter) {
    event.target.checked ? filter(true) : filter(false);
  }

  function handleSearch(inputsearch) {
    apiHandler
      .getRecipes()
      .then((resp) => {
        let arr = resp.filter((rec) =>
          rec.name.toLowerCase().includes(inputsearch.toLowerCase())
        );
        setRecettes(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="recettes">
      <h1 className="recettes-title">Les Recettes </h1>
      <Searchbar handleSearch={handleSearch} />

      <div className="pageelements">
        <div className="leftfilters">
          <div className="filterrecipe">
            <label style={{ color: "white" }} htmlFor="vegan">
              Vegan
            </label>
            <input
              id="vegan"
              type="checkbox"
              checked={vegan}
              name="vegan"
              onChange={(event) => handleChange(event, setVegan)}
            ></input>
          </div>
          <div className="filterrecipe">
            <label style={{ color: "white" }} htmlFor="vegetarien">
              Vegetarien
            </label>
            <input
              id="vegetarien"
              type="checkbox"
              checked={vegetarien}
              name="vegetarien"
              onChange={(event) => handleChange(event, setVegetarien)}
            ></input>
          </div>
          <div className="filterrecipe">
            <label style={{ color: "white" }} htmlFor="lactose">
              Sans Lactose
            </label>
            <input
              id="lactose"
              type="checkbox"
              checked={lactose}
              name="lactose"
              onChange={(event) => handleChange(event, setLactose)}
            ></input>
          </div>
          <div className="filterrecipe">
            <label style={{ color: "white" }} htmlFor="gluten">
              Sans Gluten
            </label>
            <input
              id="gluten"
              type="checkbox"
              checked={gluten}
              name="gluten"
              onChange={(event) => handleChange(event, setGluten)}
            ></input>
          </div>
        </div>
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
    </div>
  );
}

export default Recipes;
