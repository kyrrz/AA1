import axios from "axios";
import { el, icon, td } from "./documentUtil";
import { notifyOk, notifyError } from "./dialogUtil";
import { body, validationResult } from "express-validator";

window.loadGames = async function () {
  const queryParams = new URLSearchParams(window.location.search);
  const gameName = queryParams.get("id");

  if (!gameName) {
    console.error("No id en la URL");
    return;
  }
  try {
    // Solicitar datos del juego al backend
    const response = await axios.get("http://localhost:8080/games/" + gameName);
    const game = response.data;

    // Rellenar el formulario con los datos obtenidos

    el("gameName").value = game.name;
    el("gameGenere").value = game.genere;
    el("gameYear").value = game.year;
    el("gameDev").value = game.dev;
  } catch (error) {
    console.error("Error al cargar los datos del juego:", error);
    notifyError("Hubo un error al cargar los datos del juego.");
  }
};

window.modifyGame = async function () {
  // Recoger datos del formulario
  const gameName = document.getElementById("gameName").value.trim();
  const gameGenere = document.getElementById("gameGenere").value.trim();
  const gameYear = document.getElementById("gameYear").value.trim();
  const gameDev = document.getElementById("gameDev").value.trim();

  // Validar formulario cutre
  if (!gameName || !gameGenere || !gameYear || !gameDev) {
    notifyError("Por favor, completa todos los campos del formulario.");
    return;
  }

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  if (!id) {
    console.error("No se proporcionó el nombre de juego en la URL.");
    return;
  }

  try {
    // Llamar al backend para modificar el juego
    const response = await axios.put("http://localhost:8080/games/" + id, {
      genere: gameGenere,
      year: gameYear,
      developer: gameDev,
    });

    if (response.status === 204) {
      notifyOk("El juego ha sido modificado exitosamente.");
      window.location.href = "/index.html";
    } else {
      throw new Error("Estado inesperado en la respuesta del servidor.");
    }
  } catch (error) {
    console.error("Error al modificar el juego:", error);
    notifyError("Hubo un error al modificar el juego.");
  }
};

window.loadDevs = async function () {
  const queryParams = new URLSearchParams(window.location.search);
  const devsName = queryParams.get("id");

  if (!devsName) {
    console.error("No id en la URL");
    return;
  }
  try {
    // Solicitar datos del juego al backend
    const response = await axios.get("http://localhost:8080/devs/" + devsName);
    const dev = response.data;

    // Rellenar el formulario con los datos obtenidos

    el("devName").value = dev.name;
    el("devCountry").value = dev.country;
    el("devYear").value = dev.year;
  } catch (error) {
    console.error("Error al cargar los datos del desarrollador:", error);
    notifyError("Hubo un error al cargar los datos del desarrollador.");
  }
};

window.modifyDev = async function () {
  // Recoger datos del formulario
  const devName = document.getElementById("devName").value.trim();
  const devCountry = document.getElementById("devCountry").value.trim();
  const devYear = document.getElementById("devYear").value.trim();

  // Validar formulario cutre
  if (!devName || !devCountry || !devYear) {
    notifyError("Por favor, completa todos los campos del formulario.");
    return;
  }

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  if (!id) {
    console.error("No se proporcionó el nombre de juego en la URL.");
    return;
  }

  try {
    // Llamar al backend para modificar el juego
    const response = await axios.put("http://localhost:8080/devs/" + id, {
      name: devName,
      country: devCountry,
      year: devYear,
    });

    if (response.status === 204) {
      notifyOk("El desarrollador ha sido modificado exitosamente.");
      window.location.href = "/index.html";
    } else {
      throw new Error("Estado inesperado en la respuesta del servidor.");
    }
  } catch (error) {
    console.error("Error al modificar el juego:", error);
    notifyError("Hubo un error al modificar el juego.");
  }
};
