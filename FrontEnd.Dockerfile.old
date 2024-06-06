
FROM node:14-alpine

RUN apk --no-cache add bash

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/. .

EXPOSE 8080

CMD ["npm", "run", "dev"]