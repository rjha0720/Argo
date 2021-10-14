FROM node:14.18.0
EXPOSE 3000
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY server.js .
CMD [ "node", "server.js" ]

