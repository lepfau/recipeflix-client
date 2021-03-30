import React, { useState, useEffect, useReducer } from "react";
import apiHandler from "../api/apiHandler";
import { withUser } from "../components/Auth/withUser";
import { motion } from "framer-motion";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function OneRecipe(props) {
  const [oneRecipe, setoneRecipe] = useState([]);
  const [note, setNote] = useState({ note: 2 });
  const [comment, setComment] = useState({ comment: "" });
  const [value, setValue] = React.useState(3);
  const [ratings, setRatings] = useState([]);
  const [noteComment, setNoteComment] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      note: 2,
      comment: "",
    }
  );

  useEffect(() => {
    apiHandler
      .getOneRecipe(props.match.params.id)
      .then((resp) => {
        console.log(resp);
        setoneRecipe(resp);
        setRatings(resp.ratings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.match.params.id]);

  function handleChange(e) {
    e.preventDefault();
    console.log(oneRecipe);
    setNote({ [e.target.name]: e.target.value });
  }

  const handleChangeInput = (event) => {
    const name = event.target.name;
    const newValue = event.target.value;
    setNoteComment({ [name]: newValue });
  };

  function handleSubmit(e) {
    apiHandler.addRate(props.match.params.id, noteComment).then((resp) => {
      console.log(resp);
    });
    apiHandler.getOneRecipe(props.match.params.id).then((resp) => {
      setoneRecipe(resp);
      setRatings(resp.ratings);
    });
  }

  return (
    <motion.div exit={{ opacity: 0 }}>
      <div className="onerecipepage">
        <h1 className="onerecipetitle">{oneRecipe.name}</h1>
        <div className="onerecipeimagetime">
          <img className="onerecipeimage" src={oneRecipe.image} alt="img" />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <p className="legend">
              <i className="far fa-clock"></i> {oneRecipe.temps} minutes
            </p>
            <p className="legend">
              <i className="fas fa-utensils"></i>
              {oneRecipe.type}
            </p>
          </div>
        </div>
        <hr className="onerecipehr"></hr>
        <div className="onerecipeing">
          <h2 className="onerecipesubtitle">Ingredients</h2>
          {oneRecipe.ingredients &&
            oneRecipe.ingredients.map((ing, index) => {
              return (
                <p key={index} className="inggg">
                  {ing[0].toUpperCase() + ing.substring(1)}
                </p>
              );
            })}
        </div>{" "}
        <hr className="onerecipehr"></hr>
        <div className="onerecipesteps">
          <h2 className="onerecipesubtitle">Etapes</h2>

          <ol>
            {oneRecipe.etapes &&
              oneRecipe.etapes.map((ing, index) => {
                return (
                  <li key={index}>{ing[0].toUpperCase() + ing.substring(1)}</li>
                );
              })}
          </ol>

          <div>
            <Box component="fieldset" mb={1} borderColor="transparent">
              <Typography component="legend">Notez la recette !</Typography>
              <Rating
                name="note"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  handleChangeInput(event);
                }}
              />
              <button onClick={(e) => handleSubmit(e)}>Submit</button>
            </Box>
            <input
              type="text"
              name="comment"
              onChange={handleChangeInput}
            ></input>
          </div>
          <br></br>
          <br></br>
          {ratings.map((rate) => {
            return (
              <div key={rate._id} style={{ display: "flex" }}>
                <div>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating name="read-only" value={rate.note} readOnly />
                  </Box>
                </div>
                <p> {rate.id_user.email}</p> <p>{rate.comment}</p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default withUser(OneRecipe);
