FROM node:16-alpine as build-stage

ENV NODE_ENV=dev

WORKDIR /app

COPY ./ .

# install deps and build app, output is inside `.next`
RUN npm i
RUN npm run build


FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /app


# copy build app, no source code exposition
COPY --from=build-stage /app/.next ./.next
COPY --from=build-stage /app/next.config.js ./
COPY --from=build-stage /app/package.json ./package.json
COPY --from=build-stage /app/package-lock.json ./package-lock.json
COPY --from=build-stage /app/public ./public

# install node_modules deps
RUN npm ci --omit=dev

EXPOSE 3000

CMD ["npm", "run", "dev"]


