# filepath: c:\Users\hafiz\OneDrive\Desktop\DebtSentry\client-side\status21-app\Dockerfile
# Use Nginx as the base image
FROM nginx:alpine

# Copy the exported static files to the Nginx HTML directory
COPY ./out /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]