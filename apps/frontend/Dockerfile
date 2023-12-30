FROM nginx:stable-alpine

COPY ./dist/apps/frontend /usr/share/nginx/html
COPY ./apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
