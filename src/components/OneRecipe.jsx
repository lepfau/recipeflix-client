import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import { AnimatePresence, motion } from "framer-motion";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function OneRecipe(props) {
  const [oneRecipe, setoneRecipe] = useState([]);
  const [rate, setRate] = useState([]);
  const [rating, setRating] = useState({
    id_recipe: props.match.params.id,
    note: 1,
  });
  const [value, setValue] = useState(2);

  function addRate(rating) {
    apiHandler.addRate(rating).then((res) => {
      console.log(res);
    });
  }

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

  useEffect(() => {
    apiHandler
      .getRatings()
      .then((resp) => {
        let arr = resp.filter((rec) => rec.id_recipe === props.match.params.id);
        var val = arr.reduce(function (previousValue, currentValue) {
          return {
            note: previousValue.note + currentValue.note,
          };
        });

        setRate(val.note / arr.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <motion.div exit={{ opacity: 0 }}>
      <div className="onerecipepage">
        <div>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend"></Typography>
            <Rating
              name="simple-controlled"
              value={rating.note}
              onChange={(event, newValue) => {
                setRating((prevState) => ({
                  ...prevState,
                  note: newValue,
                }));
              }}
            />
          </Box>
        </div>
        <button onClick={() => addRate(rating)}>Noter la recette</button>
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
    </motion.div>
  );
}

export default OneRecipe;
