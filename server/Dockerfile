FROM node:14.17-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g pm2
COPY . ./
EXPOSE 3001
EXPOSE 9200
CMD npm run start
