# Use an official Node.js runtime as the base image
FROM node:14-alpine
 
# Set the working directory in the container
WORKDIR /app
 
# Copy package.json and package-lock.json to the container
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the application code to the container
COPY . .
# COPY .env ./
ARG API_URL
ENV REACT_APP_API_URL=$API_URL
# Build the React app
RUN npm run build
 
# Expose the port where your React app will run
EXPOSE 3000
 
# Define the command to run your React app
CMD ["npm", "start"]
 