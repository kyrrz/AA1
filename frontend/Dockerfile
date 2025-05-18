FROM node:alpine
WORKDIR /home
COPY ./ ./
RUN npm ci --include=dev
CMD ["npm", "start"]