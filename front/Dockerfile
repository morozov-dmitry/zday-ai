FROM node:11-alpine

RUN mkdir -p /usr/src/front

WORKDIR /usr/src/front

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]