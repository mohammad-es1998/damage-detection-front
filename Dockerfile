# Use an official Node.js runtime as the base image
FROM node:20-alpine as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Build your React app
RUN npm run build

# Stage 2 - the production environment
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
