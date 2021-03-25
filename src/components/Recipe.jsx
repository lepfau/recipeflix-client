import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import apiHandler from "../api/apiHandler";
import { AnimatePresence, motion } from "framer-motion";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function Recipe(recette) {
  const [rate, setRate] = useState([]);
  const [arrlength, setArrlength] = useState(0);

  let image = recette.image;

  useEffect(() => {
    apiHandler
      .getRatings()
      .then((resp) => {
        console.log(resp);
        let arr = resp.filter((rec) => rec.id_recipe === recette.id);

        var val = arr.reduce(function (previousValue, currentValue) {
          return {
            note: previousValue.note + currentValue.note,
          };
        });
        setArrlength(arr.length);
        setRate(val.note / arr.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <NavLink exact to={`/recipes/${recette.id}`}>
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundPosition: "0 0",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        key={recette._id}
        className="recipe-card"
      >
        <h3>{recette.name}</h3>
        <div>
          <p className="recipetype">{recette.type}</p>
          <p>
            <i class="far fa-clock"></i> {recette.temps} min
          </p>
          <div className="stars">
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend"></Typography>
              <Rating name="read-only" value={rate} readOnly />( {arrlength}{" "}
              votes)
            </Box>
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default Recipe;
