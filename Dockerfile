FROM node:17-alpine3.14

RUN mkdir /app && chown -R node:node /app

WORKDIR /app

COPY . .

RUN npm install

RUN npm run migration

USER node

EXPOSE 3000

CMD ["npm", "run", "start"]