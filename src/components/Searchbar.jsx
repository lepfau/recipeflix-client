import React, { useState } from "react";
import { withRouter } from "react-router-dom";

function Searchbar(props) {
  const [searchInput, setSearchInput] = useState("");

  function handleChange(event) {
    event.preventDefault();
    setSearchInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.handleSearch(searchInput);
    setSearchInput("");
  }

  return (
    <form
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onSubmit={handleSubmit}
    >
      <i
        style={{ color: "white", marginRight: "10px" }}
        className="fas fa-search"
      ></i>
      <input
        onChange={handleChange}
        type="search"
        className="searchbar"
        placeholder="Cherchez une recette"
        value={searchInput}
      ></input>
    </form>
  );
}

export default withRouter(Searchbar);
