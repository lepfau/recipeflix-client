import React from "react";
import Filter from "../components/Forms/Filter";

function Filters(props) {
  return (
    <div className="filters">
      <Filter
        html="vegan"
        id="vegan"
        checked={props.vegan}
        name="vegan"
        span="Vegan"
        handleChange={props.handleChange}
        setFunc={props.setVegan}
      />
      <Filter
        html="vegetarien"
        id="vegetarien"
        checked={props.vegetarien}
        name="vegetarien"
        span="Vegetarien"
        handleChange={props.handleChange}
        setFunc={props.setVegetarien}
      />

      <Filter
        html="lactose"
        id="lactose"
        checked={props.lactose}
        name="lactose"
        span="Sans Lactose"
        handleChange={props.handleChange}
        setFunc={props.setLactose}
      />

      <Filter
        html="gluten"
        id="gluten"
        checked={props.gluten}
        name="gluten"
        span="Sans gluten"
        handleChange={props.handleChange}
        setFunc={props.setGluten}
      />
    </div>
  );
}

export default Filters;
