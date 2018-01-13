FROM node:8



WORKDIR /srv

COPY package*.json ./

RUN npm i

COPY . .

RUN [ "chmod", "+x", "./index.sh" ]

RUN apt-get update && apt-get install jq

CMD [ "./index.sh" ]