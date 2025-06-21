FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build -- --configuration=production

FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist/atlantis-ng /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
