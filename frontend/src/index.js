import axios from "axios";
import { el, icon, td } from "./documentUtil";
import { notifyOk } from "./dialogUtil";

window.readGames = function () {
  axios.get("http://localhost:8080/games").then((response) => {
    const gameList = response.data;
    const gameTable = el("tableBody");

    gameList.forEach((game) => {
      const row = document.createElement("tr");
      row.innerHTML =
        td(game.name) +
        td(game.genere) +
        td(game.year) +
        td(game.dev) +
        '<a class="btn btn-warning" href="modify.html?id=' +
        game.name +
        '">' +
        icon("edit") +
        "</a> " +
        '<a class="btn btn-danger" href="javascript:removeGame(' +
        game.name +
        ')">' +
        icon("delete") +
        "</a>";
      gameTable.appendChild(row);
    });
  });
};
var show = true;
window.readDevs = function () {
  axios.get("http://localhost:8080/devs").then((response) => {
    const devsList = response.data;
    const devTable = el("tableBody");

    if (show == true) {
      devsList.forEach((dev) => {
        const row = document.createElement("tr");
        row.innerHTML =
          td(dev.name) +
          td(dev.country) +
          td(dev.year) +
          '<a class="btn btn-warning" href="modify.html?id=' +
          dev.name +
          '">' +
          icon("edit") +
          "</a> " +
          '<a class="btn btn-danger" href="javascript:removeGame(' +
          dev.name +
          ')">' +
          icon("delete") +
          devTable.appendChild(row);
        show = false;
      });
    }
  });
};
window.removeGame = function (name) {
  if (confirm("¿Está seguro de que desea eliminar este juego?")) {
    axios.delete("http://localhost:8080/games/" + name).then((response) => {
      if (response.status == 204) {
        notifyOk("Game eliminada correctamente");
        el(name).remove();
      }
    });
  }
};