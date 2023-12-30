FROM node:20-slim
RUN apt-get update && apt-get install --no-install-recommends -y openssl libssl-dev \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
WORKDIR /opt/fit-friends-backend
COPY ./dist/apps/backend/package*.json .
RUN npm install --omit=dev
COPY ./dist/apps/backend/assets/prisma/schema.prisma ./schema.prisma
RUN npx prisma generate --schema schema.prisma
COPY ./dist/apps/backend .
CMD [ "node", "./main.js" ]
