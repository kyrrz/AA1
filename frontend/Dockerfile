FROM node:18


COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./

CMD ["npm", "run", "start"]