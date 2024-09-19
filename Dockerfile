# Use a Node.js base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of your project files into the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to start the application (adjust according to your app's needs)
CMD ["npm", "start"]
