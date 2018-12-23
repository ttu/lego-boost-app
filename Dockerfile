# build environment
FROM node:11.1.0-alpine as builder

# Create a work directory and copy over our dependency manifest files.
RUN mkdir /app
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

COPY /src /app/src
COPY /public /app/public

RUN npm run build

# production environment
FROM nginx:1.13.9
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

HEALTHCHECK --interval=1m --timeout=10s --retries=3 CMD curl --silent --fail http://localhost:80 || exit 1