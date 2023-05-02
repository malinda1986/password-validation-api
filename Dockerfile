FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json /
COPY .env /.env
COPY . .
COPY ./db/backup/files/sqldump.sql /mydb.sql
RUN npm install

RUN npm install nest -g

EXPOSE 3001

CMD ["npm", "run", "start"]