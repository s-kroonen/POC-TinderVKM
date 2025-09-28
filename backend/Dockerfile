FROM node:20-alpine

# Set working dir
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build TypeScript
RUN npm run build

# Use production environment
ENV NODE_ENV=production
EXPOSE 5000

# Start compiled app
CMD ["node", "dist/index.js"]
