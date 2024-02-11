FROM node:20.11.0-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "npm","run" , "preview"]


# service for nginx

FROM nginx:1.23-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY --from=dist /usr/src/app/dist .

EXPOSE 80

ENTRYPOINT [ "nginx", "-g" , "daemon off" ]




