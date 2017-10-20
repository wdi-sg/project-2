FROM node:8.7.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN yarn install
COPY . /usr/src/app
CMD ["yarn", "start"]
EXPOSE 3000
