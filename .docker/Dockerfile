# ==================================
FROM node:20-alpine AS base
WORKDIR /app

# ==================================
FROM base AS builder

RUN apk add --no-cache build-base linux-headers libudev-zero python3 libc6-compat

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi
RUN yarn add sharp --ignore-engines

COPY . .
RUN yarn build

# ==================================
FROM base

COPY ./next.config.mjs ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV NODE_ENV production
ENV HOSTNAME 0.0.0.0
ENV PORT 3000

CMD ["node", "server.js"]
