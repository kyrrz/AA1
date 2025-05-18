FROM node:alpine


# Copia solo package.json y lock
COPY backend/package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del backend
COPY backend/ ./
RUN npm install
CMD ["npm", "start"]