import axios from "axios";
import { notifyError, notifyOk } from "./dialogUtil.js";
import { el } from "./documentUtil.js";

window.addGame = function () {
  const name = el("title").value;
  const genere = el("description").value;
  const year = el("year").value;
  const dev = el("dev").value;

  // TODO Validación de datos
  if (name === "") {
    notifyError("El nombre es un campo obligatorio");
    return;
  }

  if (dev === "") {
    notifyError("El dev es un campo obligatorio");
    return;
  }

  axios.post("http://localhost:8080/games", {
    name: gameName,
    genere: gameGenere,
    year: gameYear,
    dev: gameDev,
  });

  // TODO Confirmar al usuario que todo ha ido bien (o mal)
  notifyOk("Juego registrado");

  // TODO Limpiar el formulario
  el("title").value = "";
  el("description").value = "";
  el("year").value = "";
  el("dev").value = "";
};

window.addDev = function () {
  const name = el("name").value;
  const country = el("country").value;
  const year = el("year").value;

  // TODO Validación de datos
  if (name === "") {
    notifyError("El titulo es un campo obligatorio");
    return;
  }

  axios.post("http://localhost:8080/devs", {
    name: devName,
    country: devCountry,
    year: devYear,
  });

  // TODO Confirmar al usuario que todo ha ido bien (o mal)
  notifyOk("Dev registrado");

  // TODO Limpiar el formulario
  el("name").value = "";
  el("country").value = "";
  el("year").value = "";
};
