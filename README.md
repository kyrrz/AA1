INSTALACION DE PAQUETES

La parte de backend de la AA1 utiliza Node.js, Express, Knex y SQLite3.

Instalación

Sigue los pasos a continuación para configurar el proyecto en tu entorno local:

Clona este repositorio:

    git clone <URL_DEL_REPOSITORIO>

Navega al directorio del proyecto:

    cd backend

Instala las dependencias necesarias:

    npm install


Iniciar el servidor

Crearemos los siguientes scripts en nuestro package.json:

       "scripts": {
            "knex": "knex",
            "start": "nodemon",
            "test": "echo \"Error: no test specified\" && exit 1"
        },

Para iniciar el servidor en modo de desarrollo con nodemon, utiliza el siguiente comando:

    npm start

El servidor se ejecutará automáticamente y reiniciará cuando detecte cambios en el código.


Ejecutar comandos de Knex:

    npm run knex


Dependencias principales

Este proyecto utiliza las siguientes dependencias:

    cors: Middleware para habilitar CORS en las solicitudes HTTP.

    express: Framework web minimalista para construir aplicaciones backend.

    express-validator: Biblioteca para la validación de datos en las solicitudes.

    knex: Query builder SQL flexible y portátil.

    sqlite3: Sistema de base de datos SQL ligero y autocontenido.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------

Frontend

La parte frontend de la AA1 utiliza Parcel para la gestión de módulos, así como varias dependencias para mejorar la funcionalidad y el diseño.


Instala las dependencias necesarias:

    npm install


Iniciar el servidor de desarrollo

Crearemos los siguientes scripts en nuestro package.json:

      "scripts": {
            "start": "parcel --no-cache",
            "build": "parcel build"
        },
        
Para iniciar el servidor de desarrollo utilizando Parcel:

    npm start

El proyecto estará disponible en http://localhost:1234

El proyecto incluye las siguientes fuentes HTML:

    src/index.html

    src/registroDev.html

    src/registroGame.html

    src/modifyDev.html

    src/modifyGame.html

    src/login.html

    src/paginaProtegida.html

Dependencias principales

    axios: Cliente HTTP basado en promesas para realizar solicitudes.

    express-validator: Biblioteca para la validación de datos en formularios.

    toastify-js: Biblioteca para mostrar notificaciones flotantes elegantes.

Dependencias de desarrollo

    parcel: Empaquetador de aplicaciones web.

    buffer y process: Herramientas para compatibilidad con Node.js en navegadores.

