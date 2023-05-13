# FROM node:16-alpine as build-stage

# ENV NODE_ENV=dev

# WORKDIR /app

# COPY ./ .

# # install deps and build app, output is inside `.next`
# RUN npm i
# RUN npm run build


# FROM node:16-alpine as run-stage

# ENV NODE_ENV=production

# WORKDIR /app

# # copy build app, no source code exposition
# COPY --from=build-stage /app/.next ./.next
# COPY --from=build-stage /app/next.config.js ./
# COPY --from=build-stage /app/package.json ./package.json
# COPY --from=build-stage /app/package-lock.json ./package-lock.json
# COPY --from=build-stage /app/public ./public

# # install node_modules deps
# RUN npm ci --omit=dev

# EXPOSE 3000

# CMD ["npm", "run", "dev"]


FROM alpine:3.17 as node-base

RUN apk add nodejs npm tini

WORKDIR /app

ENTRYPOINT ["/sbin/tini", "--"]


FROM node-base as dev-deps

ENV NODE_ENV=production

WORKDIR /app

# copy only package and generate node_modules
COPY ./package.json ./

RUN npm i


FROM node-base AS dev-runtime

ENV NODE_ENV=production

WORKDIR /app

# copy node_modules from deps image
COPY --from=dev-deps /app/node_modules ./node_modules

# tune to be less verbose
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NEXT_TELEMETRY_DISABLED=1

# copy app sources
COPY . ./

# build
RUN npm run build

# print resulting size
RUN du -shc ./*

EXPOSE 3000

# register executor
CMD ["npm", "run", "start"]
