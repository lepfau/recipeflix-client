import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { buildFormData } from "../../utils";
import { withRouter } from "react-router-dom";
import CreateIngredients from "./CreateIngredients";
import CreateEtapes from "./CreateEtapes";
import FormSignin from "./FormSignin";
import UserContext from "../Auth/UserContext";
import { motion } from "framer-motion";
class FormCreate extends Component {
  state = {
    name: "",
    type: "plat",
    temps: 0,
    ingredients: [],
    image:
      "https://embed.widencdn.net/img/mccormick/sdhnxonw1b/1367x1367px/one%20skillet%20beef%20stir%20fry%20recipe7432.jpg?crop=true&anchor=323,0&q=80&color=ffffffff&u=kzvrjj",
    vegan: false,
    vegetarian: false,
    gluten: false,
    lactose: false,
    httpResponse: null,
    error: null,
    etapes: [],
    file: null,
  };

  handleChange = (event) => {
    event.preventDefault();
    const key = event.target.name;
    const value =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
    this.setState({
      [key]: value,
    });
  };

  handleChangeFile = (event) => {
    event.preventDefault();
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      image: event.target.files[0],
    });
  };

  handleIngredients = (data) => {
    if (data) {
      let ing = [...this.state.ingredients];
      this.setState({
        ingredients: [...ing, data],
      });
    }
  };

  handleEtapes = (data) => {
    if (data) {
      let ing = [...this.state.etapes];
      this.setState({
        etapes: [...ing, data],
      });
    }
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
          this.setState({ httpResponse: null });
        }, 2000);
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
      <motion.div exit={{ opacity: 0 }}>
        <div className="wholepage">
          <div className="wholepagecreate">
            <h1
              style={{
                color: "white",
                width: "80%",
                fontSize: "3.5em",
                backgroundColor: "red",
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
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
                      <option value="entrée">Entrée</option>
                      <option value="plat">Plat</option>
                      <option value="dessert">Dessert</option>
                      <option value="snack">Snack</option>
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
                  <CreateIngredients
                    handleIngredients={this.handleIngredients}
                  />

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
                    onChange={this.handleChangeFile}
                  ></input>
                </form>
              </div>
              <div className="ingredientsetapes">
                <div className="ingredients">
                  <h3 style={{ marginBottom: "15px" }}>Ingrédients</h3>

                  <ul>
                    {this.state.ingredients.length > 0 ? (
                      this.state.ingredients.map((ing, index) => {
                        return (
                          <div className="ingredient" key={index}>
                            <p>{ing[0].toUpperCase() + ing.substring(1)}</p>
                            <a
                              className="removebtn"
                              onClick={() => this.handleRemove(ing)}
                            >
                              X
                            </a>
                          </div>
                        );
                      })
                    ) : (
                      <div>Pas d'ingredients ajoutés pour le moment..</div>
                    )}
                  </ul>
                </div>

                <div className="etapes">
                  <h3 style={{ marginBottom: "15px" }}>Etapes</h3>

                  <ol>
                    {this.state.etapes.length > 0 ? (
                      this.state.etapes.map((ing, index) => {
                        return (
                          <div className="etape" key={index}>
                            <li>{ing[0].toUpperCase() + ing.substring(1)}</li>
                            <a
                              className="removebtn"
                              onClick={() => this.handleRemoveSteps(ing)}
                            >
                              x
                            </a>
                          </div>
                        );
                      })
                    ) : (
                      <div>
                        <p>Pas d'étapes ajoutées pour le moment..</p>
                      </div>
                    )}
                  </ol>
                </div>
                {this.state.file !== null && (
                  <img
                    style={{ width: "150px", height: "auto" }}
                    src={this.state.file}
                    alt="recipeimage"
                  />
                )}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={this.handleSubmit} className="btncreateform">
                Ajouter la recette !
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
}

export default withRouter(FormCreate);
