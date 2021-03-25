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
    <div className="onerecipepage">
      <h1 className="onerecipetitle">{oneRecipe.name}</h1>
      <div className="onerecipeimagetime">
        <img className="onerecipeimage" src={oneRecipe.image} alt="img" />
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <p className="legend">
            <i className="far fa-clock"></i> {oneRecipe.temps} minutes
          </p>
          <p className="legend">
            <i className="fas fa-utensils"></i>
            {oneRecipe.type}
          </p>
        </div>
      </div>
      <hr className="onerecipehr"></hr>
      <div className="onerecipeing">
        <h2 className="onerecipesubtitle">Ingredients</h2>
        {oneRecipe.ingredients &&
          oneRecipe.ingredients.map((ing, index) => {
            return (
              <p key={index} className="inggg">
                {ing[0].toUpperCase() + ing.substring(1)}
              </p>
            );
          })}
      </div>{" "}
      <hr className="onerecipehr"></hr>
      <div className="onerecipesteps">
        <h2 className="onerecipesubtitle">Etapes</h2>

        <ol>
          {oneRecipe.etapes &&
            oneRecipe.etapes.map((ing, index) => {
              return (
                <li key={index}>{ing[0].toUpperCase() + ing.substring(1)}</li>
              );
            })}
        </ol>
      </div>
    </div>
  );
}

export default OneRecipe;
