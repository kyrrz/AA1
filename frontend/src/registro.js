import axios from "axios";
import { notifyError, notifyOk } from "./dialogUtil.js";
import { el } from "./documentUtil.js";

window.addGame = function () {
  const name = el("gameName").value;
  const genre = el("gameGenre").value;
  const year = el("gameYear").value;
  const dev = el("gameDev").value;

  // Validación de datos

  if (!name && !genre && !year) {
    notifyError("Por favor, completa todos los campos del formulario.");
    return;
  }

  if (name === "") {
    notifyError("El nombre es un campo obligatorio");
    return;
  }
  if (genre === "") {
    notifyError("El genero es un campo obligatorio");
    return;
  }
  if (year === "") {
    notifyError("El año es un campo obligatorio");
    return;
  }
  if (dev === "") {
    notifyError("El dev es un campo obligatorio");
    return;
  }

  const result = axios.post("http://localhost:8080/games", {
    name: name,
    genre: genre,
    year: year,
    dev: dev,
  });

  if (result.status !== 201) {
    notifyError("Error al registrar el juego, Developer no encontrado");
    return;
  } else {
    notifyOk("Juego registrado");
  }
  // Limpiar el formulario
  el("gameName").value = "";
  el("gameGenre").value = "";
  el("gameYear").value = "";
  el("gameDev").value = "";
};

window.addDev = function () {
  const name = el("devName").value;
  const country = el("devCountry").value;
  const foundation_year = el("devFoundationYear").value;
  const yearly_income = el("devYearlyIncome").value;

  if (name === "") {
    notifyError("El nombre es un campo obligatorio");
    return;
  }
  if (country === "") {
    notifyError("El pais es un campo obligatorio");
    return;
  }
  if (foundation_year === "") {
    notifyError("La fecha de fundación es un campo obligatorio");
    return;
  }
  const result = axios.post("http://localhost:8080/devs", {
    name: name,
    country: country,
    foundation_year: foundation_year,
    yearly_income: yearly_income,
  });

  if (result.status !== 201) {
    notifyError("Error al registrar desarrollador");
    return;
  } else {
    notifyOk("Desarrollador registrado");
  }

  // TODO Limpiar el formulario
  el("devName").value = "";
  el("devCountry").value = "";
  el("devFoundationYear").value = "";
  el("devYearlyIncome").value = "";
};
