import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import Recipe from "../components/Recipe";
import Searchbar from "../components/Searchbar";
import SimpleMenu from "../components/SimpleMenu";
import { motion } from "framer-motion";
import { withUser } from "../components/Auth/withUser";
import Filters from "../components/Filters";

function Desserts(props) {
  const [recettes, setRecettes] = useState([]);
  const [vegan, setVegan] = useState(false);
  const [vegetarien, setVegetarien] = useState(false);
  const [lactose, setLactose] = useState(false);
  const [gluten, setGluten] = useState(false);

  function handlefilter(resp) {
    if (vegan)
      setRecettes(
        resp.filter((rec) => rec.vegan === true || rec.lactose === true)
      );
    else if (vegetarien && gluten)
      setRecettes(
        resp.filter((rec) => rec.gluten === true && rec.vegetarian === true)
      );
    else if (vegetarien && lactose)
      setRecettes(
        resp.filter((rec) => rec.lactose === true && rec.vegetarian === true)
      );
    else if (vegetarien && lactose && gluten)
      setRecettes(
        resp.filter(
          (rec) =>
            rec.lactose === true &&
            rec.vegetarian === true &&
            rec.gluten === true
        )
      );
    else if (lactose && gluten)
      setRecettes(
        resp.filter((rec) => rec.lactose === true && rec.gluten === true)
      );
    else if (vegetarien)
      setRecettes(resp.filter((rec) => rec.vegetarian === true));
    else if (lactose)
      setRecettes(
        resp.filter((rec) => rec.lactose === true || rec.vegan === true)
      );
    else if (gluten) setRecettes(resp.filter((rec) => rec.gluten === true));
    else setRecettes(resp);
  }

  useEffect(() => {
    apiHandler
      .getDesserts()
      .then((resp) => {
        if (vegan)
          setRecettes(
            resp.filter((rec) => rec.vegan === true || rec.lactose === true)
          );
        else if (vegetarien && gluten)
          setRecettes(
            resp.filter((rec) => rec.gluten === true && rec.vegetarian === true)
          );
        else if (vegetarien && lactose)
          setRecettes(
            resp.filter(
              (rec) => rec.lactose === true && rec.vegetarian === true
            )
          );
        else if (vegetarien && lactose && gluten)
          setRecettes(
            resp.filter(
              (rec) =>
                rec.lactose === true &&
                rec.vegetarian === true &&
                rec.gluten === true
            )
          );
        else if (lactose && gluten)
          setRecettes(
            resp.filter((rec) => rec.lactose === true && rec.gluten === true)
          );
        else if (vegetarien)
          setRecettes(resp.filter((rec) => rec.vegetarian === true));
        else if (lactose)
          setRecettes(
            resp.filter((rec) => rec.lactose === true || rec.vegan === true)
          );
        else if (gluten) setRecettes(resp.filter((rec) => rec.gluten === true));
        else setRecettes(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [vegan, vegetarien, lactose, gluten]);

  function handleChange(event, filter) {
    event.target.checked ? filter(true) : filter(false);
  }

  function handleSearch(inputsearch) {
    if (inputsearch.length > 0) {
      apiHandler
        .getDesserts()
        .then((resp) => {
          let arr = resp.filter((rec) =>
            rec.name.toLowerCase().includes(inputsearch.toLowerCase())
          );
          handlefilter(arr);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      apiHandler
        .getDesserts()
        .then((resp) => {
          handlefilter(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <motion.div exit={{ opacity: 0 }}>
      <div className="recettes">
        <div className="main-recettes">
          <div className="recettes-title-menu">
            <h1 className="recettes-title">Les Recettes </h1>
            <SimpleMenu />
          </div>
          <Searchbar handleSearch={handleSearch} />
        </div>
        <div className="pageelements">
          <div className="leftfilters">
            <h3 style={{ marginLeft: "20px", color: "white" }}>
              Filter les recettes
            </h3>
            <Filters
              handleChange={handleChange}
              vegan={vegan}
              setVegan={setVegan}
              vegetarien={vegetarien}
              setVegetarien={setVegetarien}
              lactose={lactose}
              setLactose={setLactose}
              gluten={gluten}
              setGluten={setGluten}
            />
          </div>
          <div className="container">
            <div className="recipe-container">
              {recettes.map((recette) => {
                return (
                  <Recipe
                    key={recette._id}
                    name={recette.name}
                    image={recette.image}
                    id={recette._id}
                    type={recette.type}
                    temps={recette.temps}
                    ratings={recette.ratings}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default withUser(Desserts);
