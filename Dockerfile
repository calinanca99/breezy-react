FROM oven/bun:1 AS builder
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install

COPY . .
RUN bun run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8000
COPY nginx.conf /etc/nginx/nginx.conf
