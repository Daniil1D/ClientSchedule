# Stage 1: Build React Application
FROM node:14 AS build

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve React Application with Nginx
FROM nginx:stable-alpine

COPY --from=build build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]
