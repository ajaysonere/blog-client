# Stage 1: Build the Node.js application
FROM node:20.11.0-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:1.23-alpine

WORKDIR /usr/share/nginx/html

# Copy built files from the previous stage
COPY --from=build /usr/src/app/dist .

# Expose port 80
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
