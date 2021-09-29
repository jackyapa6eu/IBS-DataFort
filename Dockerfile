FROM node:12-alpine as builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]