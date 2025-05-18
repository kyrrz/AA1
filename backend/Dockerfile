FROM node:alpine
COPY ./ ./
RUN npm cache clean --force && npm install
CMD ["npm", "run", "start-dev"]
