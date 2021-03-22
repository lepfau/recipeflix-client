import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../utils";
import { withRouter } from "react-router-dom";
import CreateIngredients from "./CreateIngredients";
import CreateEtapes from "./CreateEtapes";
import FormSignin from "./FormSignin";
import UserContext from "../Auth/UserContext";

class FormCreate extends Component {
  state = {
    name: "",
    type: "plat",
    temps: 0,
    ingredients: [],
    image: "",
    vegan: false,
    vegetarian: false,
    gluten: false,
    lactose: false,
    httpResponse: null,
    error: null,
    etapes: [],
  };

  handleChange = (event) => {
    event.preventDefault();
    const key = event.target.name;
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    this.setState({ [key]: value });
  };

  handleIngredients = (data) => {
    let ing = [...this.state.ingredients];
    this.setState({
      ingredients: [...ing, data],
    });
  };

  handleEtapes = (data) => {
    let ing = [...this.state.etapes];
    this.setState({
      etapes: [...ing, data],
    });
  };

  handleCheck = (event) => {
    const name = event.target.name;
    this.setState({
      [name]: event.target.checked,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    buildFormData(fd, data);

    apiHandler
      .createRecipee(fd)
      .then((data) => {
        this.setState({
          name: "",
          ingredients: [],
          image: "",
          httpResponse: {
            status: "success",
            message: "Item successfully added.",
          },
        });

        this.props.history.push("/recipes");
      })
      .catch((error) => {
        console.log(error);

        this.setState({
          httpResponse: {
            status: "failure",
            message: "Vous devez être identifié pour ajouter une recette",
          },
        });
        this.timeoutId = setTimeout(() => {
          this.props.history.push("/signup");
          this.setState({ httpResponse: null });
        }, 3000);
      });
  };

  handleRemove = (ing) => {
    console.log(ing);
    let filtered = [...this.state.ingredients];
    let final = filtered.filter((item) => item !== ing);
    this.setState({
      ingredients: final,
    });
  };

  handleRemoveSteps = (ing) => {
    console.log(ing);
    let filtered = [...this.state.etapes];
    let final = filtered.filter((item) => item !== ing);
    this.setState({
      etapes: final,
    });
  };

  handleNamesubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="wholepagecreate">
        <h1
          style={{
            color: "white",
            backgroundColor: "red",
            position: "fixed",
            top: "50%",
            left: "50%",
            marginTop: "-100px",
            marginLeft: "-250px",
          }}
        >
          {this.state.httpResponse && this.state.httpResponse.message}
        </h1>
        <h1 className="formcreate-title">Ajouter une recette</h1>
        <div className="formcontainer">
          <div className="fieldscreateform">
            <div className="inputlabelscreate">
              <form className="formname" onSubmit={this.handleNamesubmit}>
                <label htmlFor="name" className="formcreatelabel">
                  Nom
                </label>

                <input
                  className="formcreateinput"
                  id="name"
                  name="name"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.name}
                ></input>
              </form>
              <form className="formname" onSubmit={this.handleNamesubmit}>
                <label htmlFor="type" className="formcreatelabel">
                  Type
                </label>
                <select
                  className="formcreateinput"
                  id="type"
                  name="type"
                  onChange={this.handleChange}
                  value={this.state.type}
                >
                  <option value="snack">Snack</option>
                  <option value="plat">Plat</option>
                  <option value="dessert">Dessert</option>
                  <option value="autre">Autre</option>
                </select>
              </form>
              <form className="formname" onSubmit={this.handleNamesubmit}>
                <label htmlFor="name" className="formcreatelabel">
                  Durée (min)
                </label>

                <input
                  className="formcreateinput"
                  id="temps"
                  name="temps"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.temps}
                ></input>
              </form>
              <CreateIngredients handleIngredients={this.handleIngredients} />

              <CreateEtapes handleEtapes={this.handleEtapes} />
            </div>
            <form className="specificites">
              <div>
                <h3>Spécificités</h3>
              </div>
              <div className="container-vegan">
                <div className="labelinput-vegan">
                  <label htmlFor="vegan">Vegan</label>
                  <input
                    onChange={this.handleCheck}
                    type="checkbox"
                    name="vegan"
                    id="vegan"
                  ></input>
                </div>
                <div className="labelinput-vegan">
                  <label htmlFor="vegetarian">Vegetarian</label>
                  <input
                    onChange={this.handleCheck}
                    type="checkbox"
                    name="vegetarian"
                    id="vegetarian"
                  ></input>
                </div>
                <div className="labelinput-vegan">
                  <label htmlFor="gluten">Sans Gluten</label>
                  <input
                    onChange={this.handleCheck}
                    type="checkbox"
                    name="gluten"
                    id="gluten"
                  ></input>
                </div>
                <div className="labelinput-vegan">
                  <label htmlFor="lactose">Sans Lactose</label>
                  <input
                    onChange={this.handleCheck}
                    type="checkbox"
                    name="lactose"
                    id="lactose"
                  ></input>
                </div>
              </div>
            </form>
            <form>
              <label style={{ marginRight: "10px" }} htmlFor="image">
                Photo
              </label>
              <input
                id="image"
                name="image"
                type="file"
                onChange={this.handleChange}
              ></input>
            </form>
          </div>
          <div className="ingredientsetapes">
            <div className="ingredients">
              {this.state.ingredients.length > 0 ? (
                <h3 style={{ marginBottom: "15px" }}>Ingrédients</h3>
              ) : null}
              <ul>
                {this.state.ingredients
                  ? this.state.ingredients.map((ing, index) => {
                      return (
                        <div className="ingredient" key={index}>
                          <p>{ing[0].toUpperCase() + ing.substring(1)}</p>
                          <button
                            className="removebtn"
                            onClick={() => this.handleRemove(ing)}
                          >
                            x
                          </button>
                        </div>
                      );
                    })
                  : null}
              </ul>
            </div>
            <div className="etapes">
              <div className="etapes">
                {this.state.etapes.length > 0 ? (
                  <h3 style={{ marginBottom: "15px" }}>Etapes</h3>
                ) : null}
                <ol>
                  {this.state.etapes ? (
                    this.state.etapes.map((ing, index) => {
                      return (
                        <div className="etape" key={index}>
                          <li>{ing[0].toUpperCase() + ing.substring(1)}</li>
                          <button
                            className="removebtn"
                            onClick={() => this.handleRemoveSteps(ing)}
                          >
                            x
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div>
                      <p>pas d'ingredients pour le moment</p>
                    </div>
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <button onClick={this.handleSubmit} className="btncreateform">
          Enregistrer la recette !
        </button>
      </div>
    );
  }
}

export default withRouter(FormCreate);
