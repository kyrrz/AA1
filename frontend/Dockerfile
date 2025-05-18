FROM node:18


COPY frontend/package*.json ./
RUN npm install --ignore-scripts

COPY frontend/ ./

CMD ["npm", "start"]