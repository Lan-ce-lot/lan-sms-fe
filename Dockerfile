#FROM node:8.9.4-alpine
#WORKDIR /usr/src/app
#COPY package*.json ./
#RUN npm install -g cnpm --registry=https://registry.npmmirror.com
#RUN cnpm install
#COPY . .
#
#FROM nginx:alpine
#COPY toborFront.conf /etc/nginx/conf.d/
#EXPOSE 8080
#CMD ["nginx", "-g", "daemon off;"]
#EXPOSE 3000
#CMD [ "npm", "start" ]
## nginx
#FROM nginx:1.13.12-alpine

FROM bitnami/nginx:1.18
WORKDIR /app
ENV port=3000

RUN sed -i -r "s|(\s+listen\s+)[0-9]+;|\1$port;|" /opt/bitnami/nginx/conf/nginx.conf
COPY proxy.conf /opt/bitnami/nginx/conf/bitnami/my.conf
COPY dist ./
