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

  function getAllRecipes() {
    apiHandler
      .getRecipes()
      .then((resp) => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);

        setRecettes(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAllRecipes();
  }, []);

  function handleChange(event, spec) {
    console.log(event.target.checked);
    if (spec == "ail") setAil(true);
    else if (spec == "citron") setCitron(true);
    else if (spec == "crème") setCreme(true);

    let arr = [...recettes]
      .filter((rec) => !rec.ingredients.includes(spec))
      .map((rec) => rec);
    if (event.target.checked === true) {
      setRecettes(arr);
    }
  }

  function handleSubmit() {
    if (ail === true) setAil(false);
    if (citron === true) setCitron(false);
    if (creme === true) setCreme(false);
    getAllRecipes();
  }

  return (
    <div className="recettes">
      <h1 className="recettes-title">Les Recettes </h1>

      <div className="recipes-inputs">
        <input
          type="checkbox"
          onChange={(e) => handleChange(e, "ail")}
          id="sansail"
          checked={ail}
        ></input>
        <label htmlFor="sansail">Sans ail</label>

        <input
          type="checkbox"
          onChange={(e) => handleChange(e, "citron")}
          id="sanscitron"
          checked={citron}
        ></input>
        <label htmlFor="sanscitron">Sans citron</label>

        <input
          type="checkbox"
          onChange={(e) => handleChange(e, "crème")}
          id="sanscreme"
          checked={creme}
        ></input>
        <label htmlFor="sanscreme">Sans creme</label>
        <button onClick={handleSubmit}>Reinitialiser filtres</button>
      </div>
      {loading ? (
        <img
          className="loading"
          src="https://i.gifer.com/LPxR.gif"
          alt="loading gif"
        />
      ) : (
        recettes.map((recette) => {
          return (
            <Recipe name={recette.name} ingredients={recette.ingredients} />
          );
        })
      )}
    </div>
  );
}

export default Recipes;
