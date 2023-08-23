FROM node:12.14-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ENV DOCKERIZE_VERSION v0.6.0

RUN apk update \
  && apk add --no-cache --virtual .run-deps \
  curl nginx supervisor nodejs npm \
  && wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN chown -R nginx:nginx /var/www \
  # && mkdir -p /etc/nginx \
  && mkdir -p /etc/nginx/sites-available \
  && mkdir -p /etc/nginx/sites-enabled \
  && mkdir -p /var/log/supervisor
  # && rm -Rf /var/www/*

# Install app dependencies
COPY *.json /usr/src/app/

RUN npm install

# # Bundle app source
COPY . /usr/src/app

ARG BUILD_TYPE
COPY .env /usr/src/app/.env

RUN npm run build

RUN mkdir -p /run/nginx \
    && rm -r /etc/nginx/conf.d/default.conf \
    && cp -r rootfs/etc/nginx/sites-enabled/default.conf /etc/nginx/conf.d/default.conf \
    && cp -r rootfs/etc/supervisord.conf /etc/supervisord.conf
    # && cp -r dist/* /var/www/localhost/htdocs/

EXPOSE 80 443

ENTRYPOINT ["dockerize", \
    # "-template", "/usr/src/app/.env.example:/usr/src/app/.env", \
    "-stdout", "/var/log/nginx/error.log", \
    "-stdout", "/dev/stderr", \
    "-poll"]

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisord.conf"]
