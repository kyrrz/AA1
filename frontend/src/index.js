import axios from "axios";
import { el, icon, td } from "./documentUtil";
import { notifyOk } from "./dialogUtil";

window.readGames = function () {
  axios.get("http://localhost:8080/games").then((response) => {
    const gameList = response.data;
    const gameTable = el("tableBody");

    gameTable.innerHTML = "";

    gameList.forEach((game) => {
      const row = document.createElement("tr");
      row.setAttribute("id", `game-${encodeURIComponent(game.name)}`);
      row.innerHTML =
        td(game.name) +
        td(game.genre) +
        td(game.year) +
        td(game.dev) +
        `<a class="btn btn-warning" href="modifyGame.html?id=${encodeURIComponent(
          game.name
        )}">${icon("edit")}</a> ` +
        `<a class="btn btn-danger" href="javascript:removeGame('${encodeURIComponent(
          game.name
        )}')">${icon("delete")}</a>`;
      gameTable.appendChild(row);
    });
  });
  el("devsShow").ariaLabel("Devs");
};

window.readDevs = function () {
  axios.get("http://localhost:8080/devs").then((response) => {
    const devsList = response.data;
    const devTable = el("tableBody");

    devTable.innerHTML = "";

    devsList.forEach((dev) => {
      const row = document.createElement("tr");
      row.setAttribute("id", `dev-${encodeURIComponent(dev.name)}`);

      row.innerHTML =
        td(dev.name) +
        td(dev.country) +
        td(dev.foundation_year) +
        `<a class="btn btn-warning" href="modifyDev.html?id=${encodeURIComponent(
          dev.name
        )}">${icon("edit")}</a> ` +
        `<a class="btn btn-danger" href="javascript:removeDev('${encodeURIComponent(
          dev.name
        )}')">${icon("delete")}</a>`;
      devTable.appendChild(row);
    });
  });
  el("devsShow").remove();
};
window.removeGame = function (name) {
  if (confirm("¿Está seguro de que desea eliminar este juego?")) {
    axios
      .delete("http://localhost:8080/games/" + encodeURIComponent(name))
      .then((response) => {
        if (response.status === 204) {
          notifyOk("Juego eliminado correctamente");
          const row = el(`game-${encodeURIComponent(name)}`);
          if (row) row.remove();
        }
      });
  }
};

window.removeDev = function (name) {
  if (confirm("¿Está seguro de que desea eliminar este dev?")) {
    axios
      .delete("http://localhost:8080/devs/" + encodeURIComponent(name))
      .then((response) => {
        if (response.status === 204) {
          notifyOk("Desarrollador eliminado correctamente");
          const row = el(`dev-${encodeURIComponent(name)}`);
          if (row) row.remove();
        }
      });
  }
};
