FROM node:18-alpine

RUN mkdir /app && chown -R node:node /app

WORKDIR /app

COPY . .

RUN npm install

USER node

EXPOSE 3000