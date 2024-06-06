FROM node:14-alpine

RUN apk --no-cache add bash

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

# me aseguro de que vue-cli-service esté en el PATH
#ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 8080

CMD ["npm", "run", "dev"]
