import React from "react";
import { NavLink } from "react-router-dom";
import RatingStars from "./RatingStars";

function RecipeCard(props) {
  let sum = 0;
  let total = 0;
  if (props.ratings.length > 0) {
    props.ratings.forEach((rate) => {
      sum += rate.note;
    });
    total = sum / props.ratings.length;
  } else {
    total = 0;
  }

  return (
    <NavLink exact to={`/recipes/${props.id}`}>
      <div
        style={{
          backgroundImage: `url(${props.image})`,
          backgroundPosition: "0 0",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        key={props._id}
        className="recipe-card"
      >
        <h3>{props.name}</h3>
        <div>
          <p className="recipetype">{props.type}</p>
          <p>
            <i className="far fa-clock"></i> {props.temps} min
          </p>
          <div>
            <RatingStars value={total} typo={props.ratings.length} />
          </div>
        </div>
      </div>
    </NavLink>
  );
}

export default RecipeCard;
