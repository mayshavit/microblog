FROM node:12.16.2

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8010

CMD ["npm", "start"]