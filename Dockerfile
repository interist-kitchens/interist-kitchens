# Stage 1: Builder
FROM node:22-slim AS builder

# Установка зависимостей для Prisma
RUN apt-get update && apt-get install -y openssl

WORKDIR /app

# 1. Установка зависимостей
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-timeout 1000000

# 2. Копируем специфичные файлы для Prisma
COPY src/shared/prisma/schema.prisma ./src/shared/prisma/schema.prisma
COPY src/shared/prisma/seed.ts ./src/shared/prisma/seed.ts

# 3. Генерация Prisma клиента
RUN npx prisma generate --schema=./src/shared/prisma/schema.prisma

# 4. Копируем остальной код
COPY . .

# 5. Сборка приложения
RUN yarn build

# Stage 2: Runner
FROM node:22-slim

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# 1. Копируем package.json и зависимости
COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
COPY --from=builder /app/node_modules ./node_modules

# 2. Копируем собранное приложение и конфиг
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.mjs .

# 3. Копируем Prisma клиент и схему
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/src/shared/prisma ./src/shared/prisma

# 4. Установка production зависимостей
RUN yarn install --production --frozen-lockfile --network-timeout 1000000

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s \
  CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["sh", "-c", "npx prisma migrate deploy --schema=./src/shared/prisma/schema.prisma && yarn start"]