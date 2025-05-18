FROM node:alpine
WORKDIR /home
COPY ./ ./
RUN npm ci
CMD ["npm", "start"]