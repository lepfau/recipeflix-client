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
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="ingredients">Ingredients</label>
        <input
          onChange={this.handleChange}
          id="ingredients"
          name="ingredietns"
          type="text"
          value={this.state.ingredients}
        ></input>
      </form>
    );
  }
}
