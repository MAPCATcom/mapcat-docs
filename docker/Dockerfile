FROM node:alpine

ARG VERSION
ARG TYPE=basic

ENV NODE_ENV production

RUN mkdir -p /opt/docs/dist/
WORKDIR /opt/docs/dist/

RUN npm install -g static-server

ADD dist /opt/docs/dist/
ADD node_modules/@mapcat/mapview-init/dist/mapcatview-min.js /opt/docs/dist/assets/js/
ADD docker/docker-entrypoint.ash /opt/docs/dist/
ADD swagger /opt/docs/dist/swagger/
ADD leaflet-demo /opt/docs/dist/demo/leaflet/

EXPOSE 8080

ENTRYPOINT ["/opt/docs/dist/docker-entrypoint.ash"]