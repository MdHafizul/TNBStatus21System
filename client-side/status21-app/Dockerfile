# Use an official Node.js runtime as a parent image
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app for static export
RUN npm run build

# Use an Nginx image to serve the static files
FROM nginx:alpine

# Copy the exported Next.js app to the Nginx HTML directory
COPY --from=build /app/out /usr/share/nginx/html

# Add a default Nginx configuration to handle routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]