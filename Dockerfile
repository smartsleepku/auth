FROM node:8

WORKDIR /auth
COPY ./ ./

RUN npm install
RUN npm run compile

CMD node /auth/dist/index.js
