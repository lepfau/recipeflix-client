import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import apiHandler from "../api/apiHandler";
import { withUser } from "../components/Auth/withUser";
import Recipe from "../components/Recipe";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    textDecoration: "underline",
    textAlign: "center",
  },
  para: {
    marginLeft: 50,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});

const MyDoc = (props) => (
  <Document>
    <Page size="A4" style={styles.page} wrap={false}>
      <View style={styles.section}>
        <Text>Ma liste de courses</Text>
      </View>
      <View style={styles.para}>
        {props.liste
          ? props.liste.map((a, index) => {
              return <Text>• {a}</Text>;
            })
          : ""}
      </View>
    </Page>
  </Document>
);

const Profile = (props) => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [liste, setListe] = useState([]);

  useEffect(() => {
    apiHandler
      .getUserProfile()
      .then((resp) => {
        setRecipes(resp.id_recipes);
        setFavorites(resp.favorites);
        setListe(resp.liste);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleDelete(recipeId) {
    apiHandler.deleteRecipe(recipeId).then(() => {
      apiHandler.deleteAllRates(recipeId);
      setFavorites(favorites.filter((fav) => fav._id !== recipeId));
    });

    setRecipes(recipes.filter((recipe) => recipe._id !== recipeId));
  }

  function handleListeDelete(id) {
    apiHandler.deleteListe(id).then((resp) => {
      apiHandler
        .getUserProfile()
        .then((resp) => {
          setListe(resp.liste);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  function handleListeIng(id, item) {
    apiHandler.deleteListeIng(id, item).then((resp) => {
      setListe(liste.filter((liste) => liste !== item));
    });
  }

  return (
    <div>
      <h1 className="recettes-title">Mon profil</h1>
      <div>
        <h2
          style={{ color: "white", marginBottom: "40px", marginLeft: "50px" }}
        >
          Mes recettes ajoutées
        </h2>
        <div className="recipe-container" style={{ marginLeft: "50px" }}>
          {recipes.length > 0 ? (
            recipes.map((recette) => {
              return (
                <div
                  key={recette._id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="profilerecipes"
                    style={{ display: "flex" }}
                    key={recette._id}
                  >
                    <Recipe
                      key={recette._id}
                      name={recette.name}
                      image={recette.image}
                      id={recette._id}
                      type={recette.type}
                      temps={recette.temps}
                      ratings={recette.ratings}
                      id_user={recette.id_user}
                    />
                  </div>
                  <i
                    onClick={() => handleDelete(recette._id)}
                    className="fas fa-trash"
                    style={{
                      color: "white",
                      cursor: "pointer",
                      marginBottom: "20px",
                      marginTop: "15px",
                    }}
                  ></i>
                </div>
              );
            })
          ) : (
            <p style={{ color: "white" }}>
              Pas de recettes ajoutées pour le moment..
            </p>
          )}
        </div>
      </div>
      <div>
        <h2
          style={{ color: "white", marginBottom: "40px", marginLeft: "50px" }}
        >
          Mes recettes favorites
        </h2>
        <div className="recipe-container" style={{ marginLeft: "50px" }}>
          {favorites.length > 0 ? (
            favorites.map((recette) => {
              return (
                <div
                  key={recette._id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex" }} key={recette._id}>
                    <Recipe
                      key={recette._id}
                      name={recette.name}
                      image={recette.image}
                      id={recette._id}
                      type={recette.type}
                      temps={recette.temps}
                      ratings={recette.ratings}
                    />
                  </div>
                  <i
                    onClick={() => handleDelete(recette._id)}
                    className="fas fa-trash"
                    style={{
                      color: "white",
                      cursor: "pointer",
                      marginBottom: "20px",
                      marginTop: "15px",
                    }}
                  ></i>
                </div>
              );
            })
          ) : (
            <p style={{ color: "white" }}>
              Pas de recettes favorites pour le moment..
            </p>
          )}
        </div>
        <div>
          <h2
            style={{ color: "white", marginBottom: "20px", marginLeft: "50px" }}
          >
            Ma liste de courses
          </h2>
          <PDFDownloadLink
            className="btncreateform2"
            document={<MyDoc liste={liste} />}
            fileName="listecourses.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Document en création...." : "Télécharger(PDF)"
            }
          </PDFDownloadLink>
          <button
            class="btncreateform2"
            onClick={() => handleListeDelete(props.context.user._id)}
          >
            Vider la liste
          </button>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "250px",
              marginLeft: "50px",
              marginBottom: "100px",
            }}
          >
            {liste.map((list, index) => {
              return (
                <div
                  className="listitems"
                  style={{ display: "flex", justifyContent: "space-between" }}
                  key={index}
                >
                  <li style={{}}>{list}</li>
                  <a
                    style={{
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "800",
                    }}
                    onClick={() => handleListeIng(props.context.user._id, list)}
                  >
                    X
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withUser(Profile);
