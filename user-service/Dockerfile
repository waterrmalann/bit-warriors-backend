# -- Setup Stage --
FROM node:20-alpine AS base

RUN npm i -g pnpm

# -- Dependency Stage --
FROM base as dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# -- Build Stage --
FROM base as build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
# RUN pnpm build
RUN pnpm prune --prod

# -- Deploy Stage --
FROM base as deploy

WORKDIR /app
# COPY --from=build /app/dist/ ./dist/
COPY --from=build /app/node_modules ./node_modules

# EXPOSE 3000

CMD [ "node", "server.js" ]
# dist/server.js