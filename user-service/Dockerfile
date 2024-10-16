# api-gateway/Dockerfile

# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .


