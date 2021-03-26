import React from "react";
import { NavLink } from "react-router-dom";

function RecipeCard(props) {
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
          <div className="stars"></div>
        </div>
      </div>
    </NavLink>
  );
}

export default RecipeCard;
