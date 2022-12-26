FROM node:18-alpine as base

WORKDIR /usr/app

ENV NODE_ENV development
ENV USER_DB test
ENV PASS_DB test
ENV DB_NAME testing_db
ENV HOST db

COPY package.json package.json

RUN npm install

COPY . .

#CMD ["npm", "start"]