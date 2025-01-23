import axios from "axios";
import { notifyError, notifyOk } from "./dialogUtil.js";
import { el } from "./documentUtil.js";


window.addGame = function () {
  const name = el("gameName").value;
  const genere = el("gameGenere").value;
  const year = el("gameYear").value;
  const dev = el("gameDev").value;

  /*const errors = validationResult([
    body("name").notEmpty().withMessage("El nombre es un campo obligatorio"),
    body("dev").notEmpty().withMessage("El dev es un campo obligatorio"),
  ]);

  if (!errors.isEmpty()) {
    errors.array().forEach((error) => notifyError(error.msg));
    return;
  }
*/
  // Validación de datos
  if (name === "") {
    notifyError("El nombre es un campo obligatorio");
    return;
  }

  if (dev === "") {
    notifyError("El dev es un campo obligatorio");
    return;
  }

  axios.post("http://localhost:8080/games", {
    name: name,
    genere: genere,
    year: year,
    dev: dev,
  });

  // TODO Confirmar al usuario que todo ha ido bien (o mal)
  notifyOk("Juego registrado");

  // TODO Limpiar el formulario
  el("gameName").value = "";
  el("gameGenere").value = "";
  el("gameYear").value = "";
  el("gameDev").value = "";
};

window.addDev = function () {
  const name = el("devName").value;
  const country = el("devCountry").value;
  const year = el("devYear").value;

  /* const errors = validationResult([
    body("name").notEmpty().withMessage("El nombre es un campo obligatorio"),
  ]);*/

  // Validación de datos cutre
  if (name === "") {
    notifyError("El titulo es un campo obligatorio");
    return;
  }
  axios.post("http://localhost:8080/devs", {
    name: name,
    country: country,
    year: year,
  });

  // TODO Confirmar al usuario que todo ha ido bien (o mal)
  notifyOk("Dev registrado");

  // TODO Limpiar el formulario
  el("devName").value = "";
  el("devCountry").value = "";
  el("devYear").value = "";
};
