import React, { Component } from "react";

export default class CreateEtapes extends Component {
  state = {
    etapes: "",
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      etapes: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleEtapes(this.state.etapes);
    this.setState({
      etapes: "",
    });
  };

  render() {
    return (
      <form className="formname" onSubmit={this.handleSubmit}>
        <label htmlFor="etapes" className="formcreatelabel">
          Etapes
        </label>
        <div className="inputbutton">
          <input
            className="formcreateinput"
            onChange={this.handleChange}
            id="etapes"
            name="etapes"
            type="text"
            value={this.state.etapes}
          ></input>
          <button type="submit"> + </button>
        </div>
      </form>
    );
  }
}
