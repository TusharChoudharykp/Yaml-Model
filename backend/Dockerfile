# =========================
# BUILD STAGE
# =========================

FROM node:18-alpine AS builder

WORKDIR /app

RUN apk add --no-cache \
    openssl \
    ca-certificates

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# =========================
# PRODUCTION STAGE
# =========================

FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache \
    openssl \
    ca-certificates

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

#COPY .env .env

EXPOSE 5000

CMD ["node", "dist/index.js"]