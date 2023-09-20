FROM node:18-alpine
WORKDIR /app
COPY ./src/* /app
RUN npm install
CMD [ "node", "interval.js" ]