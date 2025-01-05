import axios from "axios";
import { el, icon, td } from "./documentUtil";
import { notifyOk } from "./dialogUtil";

window.readGames = function () {
  axios.get("http://localhost:8080/games").then((response) => {
    const gameList = response.data;
    const gameTable = el("tableBody");

    gameList.forEach((game) => {
      const row = document.createElement("tr");
      row.id = "game-" + game.id;
      row.innerHTML =
        td(game.name) +
        td(game.genere) +
        td(game.year) +
        td(game.dev) +
        '<a class="btn btn-warning" href="modify.html?id=' +
        game.id +
        '">' +
        icon("edit") +
        "</a> " +
        '<a class="btn btn-danger" href="javascript:removeGame(' +
        game.id +
        ')">' +
        icon("delete") +
        "</a>";
      gameTable.appendChild(row);
    });
  });
};

window.removeGame = function (id) {
  if (confirm("¿Está seguro de que desea eliminar este juego?")) {
    axios.delete("http://localhost:8080/games/" + id).then((response) => {
      if (response.status == 204) {
        notifyOk("Game eliminada correctamente");
        el("game-" + id).remove();
      }
    });
  }
};
