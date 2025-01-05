import axios from "axios";
import { el, icon, td } from "./documentUtil";
import { notifyOk } from "./dialogUtil";

window.loadGames = function () {
  const queryParams = new URLSearchParams(window.location.search);
  const gameName = queryParams.get("name");
  // TODO Cargar la pelicula cuyo id es movieId y rellenar el formulario con esos datos

  if (!gameName) {
    console.error("No gamename");
    return;
  }
  try {
    // Solicitar datos del juego al backend
    const response = axios.get("http://localhost:8080/games/ " + gameName);
    const game = response.data;

    // Rellenar el formulario con los datos obtenidos
    el("gameName").placeholder = game.name;
    el("gameGenere").value = game.genere;
    el("gameYear").value = game.year;
    el("gameDev").value = game.dev;
  } catch (error) {
    console.error("Error al cargar los datos del juego:", error);
    alert("Hubo un error al cargar los datos del juego.");
  }
};

window.modifyMovie = function () {
  // Recoger datos del formulario
  const gameName = document.getElementById("gameName").value.trim();
  const gameGenere = document.getElementById("gameGenere").value.trim();
  const gameYear = document.getElementById("gameYear").value.trim();
  const gameDev = document.getElementById("gameDev").value.trim();

  // Validar formulario
  if (!gameName || !gameGenere || !gameYear || !gameDev) {
    notifyError("Por favor, completa todos los campos del formulario.");
    return;
  }

  const queryParams = new URLSearchParams(window.location.search);
  const gameName2 = queryParams.get("name");
  if (!gameName2) {
    console.error("No se proporcionó un ID de juego en la URL.");
    return;
  }

  try {
    // Llamar al backend para modificar el juego
    const response = axios.put(`http://localhost:8080/games/${gameName}`, {
      genre: gameGenere,
      year: gameYear,
      developer: gameDev,
    });

    if (response.status === 200) {
      alert("El juego ha sido modificado exitosamente.");
      window.location.href = "/games"; // Redirigir a la lista de juegos, ajustar según tu aplicación
    } else {
      throw new Error("Estado inesperado en la respuesta del servidor.");
    }
  } catch (error) {
    console.error("Error al modificar el juego:", error);
    alert("Hubo un error al modificar el juego.");
  }
};
