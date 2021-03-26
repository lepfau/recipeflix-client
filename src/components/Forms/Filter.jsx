import React from "react";

function Filter(filter) {
  return (
    <div className="filterrecipe">
      <label
        style={{ color: "white" }}
        htmlFor={filter.html}
        className="switch"
      >
        <input
          id={filter.id}
          type="checkbox"
          checked={filter.checked}
          name={filter.name}
          onChange={(event) => filter.handleChange(event, filter.setFunc)}
        ></input>
        <span className="slider round"></span>
      </label>
      <span style={{ color: "white" }}>{filter.span}</span>
    </div>
  );
}

export default Filter;
