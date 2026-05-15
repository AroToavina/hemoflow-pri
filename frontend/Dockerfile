# --- Stage 1: Build ---
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Stage 2: Runtime ---
FROM nginx:stable-alpine

# Non-root setup for Nginx
RUN addgroup -S nginxgroup && adduser -S nginxuser -G nginxgroup \
    && touch /var/run/nginx.pid \
    && chown -R nginxuser:nginxgroup /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

WORKDIR /usr/share/nginx/html

# Copy build artifacts
COPY --from=build --chown=nginxuser:nginxgroup /app/dist .

# Custom nginx config to handle SPA routing if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

USER nginxuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
