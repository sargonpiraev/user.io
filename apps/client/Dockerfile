FROM node:8

WORKDIR /srv

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run lint

RUN npm run test

RUN npm run make

EXPOSE 8080

CMD [ "npm", "start" ]