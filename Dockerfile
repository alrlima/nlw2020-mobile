FROM node:14.1-alpine AS nlw_mobile
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --silent
COPY . .
CMD ["npm", "run", "build:android"]