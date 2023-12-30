FROM node:20-slim
RUN apt-get update && apt-get install --no-install-recommends -y openssl libssl-dev \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /app/fitfriends
COPY ./dist/apps/backend/package*.json .
RUN npm ci --omit=dev
COPY ./prisma/schema.prisma ./prisma/schema.prisma
RUN npx prisma generate --schema ./prisma/schema.prisma
COPY ./dist/apps/backend .
CMD [ "node", "./main.js" ]
