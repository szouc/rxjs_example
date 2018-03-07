FROM node:carbon
COPY . /app
WORKDIR /app
RUN npm install --registry=https://registry.npm.taobao.org
CMD [ "yarn", "install" ]
