FROM docker.io/nginx:stable-alpine
COPY  dist/apps/lagis/desktop/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
