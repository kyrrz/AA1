import { notifyOk, notifyError } from "./dialogUtil";
import { el } from "./documentUtil";

window.iniciarSesion = async function (e) {
  e.preventDefault(); // Previene la recarga del formulario

  const username = el("username").value;
  const password = el("password").value;

  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      notifyOk(data.message); // Login exitoso
      window.location.href = "/paginaProtegida.html"; // Redirige a la página protegida
    } else {
      notifyError(
        data.errors
          ? data.errors.map((err) => err.msg).join("\n")
          : data.message
      );
    }
  } catch (err) {
    notifyError("Ocurrió un error al intentar iniciar sesión.");
    console.error(err);
  }
};
