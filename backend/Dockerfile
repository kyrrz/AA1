FROM node:alpine


# Copia solo package.json y lock
COPY backend/package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del backend
COPY backend/ ./

# Comando para iniciar
CMD ["npm", "run", "start-dev"]