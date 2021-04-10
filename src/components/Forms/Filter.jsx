import React from "react";
import useSound from "use-sound";
import popsound from "../../assets/pop.flac";

function Filter(filter) {
  const [play] = useSound(popsound);

  return (
    <div className="filterrecipe">
      <label
        style={{ color: "white" }}
        htmlFor={filter.html}
        className="switch"
      >
        <input
        onClick={play}
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
