FROM node:9.11.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent

COPY . .

CMD [ "npm", "start" ]