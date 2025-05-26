FROM node:18-alpine AS base

ARG NEXT_PUBLIC_GOOGLE_MAP_API_KEY
ARG NEXT_PUBLIC_ROUTES_GOOGLE_API_URL
ARG NEXT_PUBLIC_MAPS_GOOGLE_API_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SIMPLY_HOP_API_URL
ARG NEXT_PUBLIC_SIMPLY_HOP_PAYMENT_FEATURE

# Set ENV variables from ARGs
ENV NEXT_PUBLIC_GOOGLE_MAP_API_KEY=${NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
ENV NEXT_PUBLIC_ROUTES_GOOGLE_API_URL=${NEXT_PUBLIC_ROUTES_GOOGLE_API_URL}
ENV NEXT_PUBLIC_MAPS_GOOGLE_API_URL=${NEXT_PUBLIC_MAPS_GOOGLE_API_URL}
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_SIMPLY_HOP_API_URL=${NEXT_PUBLIC_SIMPLY_HOP_API_URL}
ENV NEXT_PUBLIC_SIMPLY_HOP_PAYMENT_FEATURE=${NEXT_PUBLIC_SIMPLY_HOP_PAYMENT_FEATURE}

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm i

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/next.config.js ./next.config.js

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
