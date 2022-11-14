FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./

ADD . ./

RUN npm install -ci

CMD ["node", "index.js"]

EXPOSE 7952/tcp