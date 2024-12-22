# Use a Node.js base image
FROM node:20-slim

# Install OpenSSL development libraries (if needed for your app)
RUN apt-get update && apt-get install -y \
    curl \
    openssl \
    libssl-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the source code
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the service port (default: 3000 for Express)
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]
