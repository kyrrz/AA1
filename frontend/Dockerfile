FROM node:lts

WORKDIR /usr/src/app

# Copy both package.json and package-lock.json
COPY package*.json ./

# Install dependencies using npm ci
RUN npm ci

# Copy the remaining application files
COPY ./ ./

# Specify the command to run the application
CMD ["npm", "start"]