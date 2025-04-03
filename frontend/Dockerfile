# Use the official Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the frontend dependencies
RUN npm install

# Copy the rest of the Vue.js app files
COPY . .

# Build the Vue.js app for production
RUN npm run build

# Expose the port for the app
EXPOSE 8080

# Start the development server (or production server if needed)
CMD ["npm", "run", "serve"]
