# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD [ "npm", "start" ]