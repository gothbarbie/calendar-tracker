FROM node

COPY ./package.json ./package.json 
RUN npm install

COPY server.js ./server.js 
COPY views ./views
COPY public ./public

ENV PORT=80
EXPOSE 80

CMD node server.js
