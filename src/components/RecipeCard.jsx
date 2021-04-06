import React from "react";
import { NavLink } from "react-router-dom";
import RatingStars from "./RatingStars";

function RecipeCard(props) {
  let sum = 0;
  let total = 0;

  (function summm() {
    props.ratings.forEach((rate) => {
      sum += rate.note;
    });
    total = sum / props.ratings.length;
  })();

  return (
    <NavLink exact to={`/recipes/${props.id}`}>
      <div
        style={{
          backgroundImage: `url(${props.image})`,
        }}
        key={props._id}
        className="recipe-card"
      >
        <div className="recipe-card-name">
          {" "}
          <h3 className="recipe-card-name-text">{props.name}</h3>{" "}
        </div>

        <div className="recipeinfoscard">
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
