const { body, validationResult } = require("express-validator");

const validUser = { username: "admin", password: "123" }; // Usuario y contraseña ficticia

exports.login = [
  // Validación de datos
  body("username").notEmpty().withMessage("El usuario es obligatorio"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Verificar credenciales
    if (username !== validUser.username || password !== validUser.password) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    res.json({ message: "Login exitoso", username });
  },
];
console.log("login controller");
