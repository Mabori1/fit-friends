FROM node:20-slim
RUN apt-get update && apt-get install -y openssl libssl-dev
WORKDIR /opt/fit-friends-frontend
COPY ./dist/apps/frontend/package*.json .
RUN npm install --omit=dev
COPY ./dist/apps/frontend .
CMD [ "node", "./main.js" ]
