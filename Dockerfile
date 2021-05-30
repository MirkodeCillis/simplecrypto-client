# Build lane
FROM node:latest as builder

RUN apt -q update && apt -q install python make g++ build-dependencies build-base gcc

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH
ADD package.json /usr/src/app/package.json

RUN npm install -g npm@next
RUN npm install

ADD . /usr/src/app

RUN npm run build

# Production lane
FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/conf.d/

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]