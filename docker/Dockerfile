FROM node:alpine

ARG VERSION
ARG TYPE=basic

ENV NODE_ENV production

RUN mkdir -p /opt/docs/dist/
WORKDIR /opt/docs/dist/

RUN npm install -g static-server

ADD dist /opt/docs/dist/
ADD docker/docker-entrypoint.ash /opt/docs/dist/
ADD swagger /opt/docs/dist/swagger/

EXPOSE 8080

ENTRYPOINT ["/opt/docs/dist/docker-entrypoint.ash"]