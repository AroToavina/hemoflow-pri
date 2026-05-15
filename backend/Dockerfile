# --- Stage 1: Build ---
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files for caching
COPY package*.json ./

# Install dependencies (frozen-lockfile for consistency)
RUN npm ci --only=production

# Copy source code
COPY . .

# --- Stage 2: Runtime ---
FROM node:20-alpine

# Use non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

# Copy node_modules and code from build stage
COPY --from=build --chown=appuser:appgroup /app /app

USER appuser

EXPOSE 5000

CMD ["node", "server.js"]
