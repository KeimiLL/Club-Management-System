FROM node:18.12.1-alpine AS node

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 4200
CMD ["yarn", "run", "start", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check", "--poll", "1000"]
