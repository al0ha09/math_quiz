FROM nginx:alpine

# Копируем HTML/JS/CSS
COPY html/ /usr/share/nginx/html

# Копируем кастомный конфиг
COPY docker/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
