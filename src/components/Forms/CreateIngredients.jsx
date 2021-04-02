import React, { Component } from "react";

export default class CreateIngredients extends Component {
  state = {
    ingredients: "",
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      ingredients: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleIngredients(this.state.ingredients);
    this.setState({
      ingredients: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="formname ">
        <label htmlFor="ingredients" className="formcreatelabel">
          Ingredients
        </label>
        <div className="inputbutton">
          <input
            className="formcreateinput"
            onChange={this.handleChange}
            id="ingredients"
            name="ingredietns"
            type="text"
            value={this.state.ingredients}
          ></input>
          <button type="submit" className="btnformcreate">
            +
          </button>
        </div>
      </form>
    );
  }
}
