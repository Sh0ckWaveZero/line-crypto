FROM node:18 As development
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
WORKDIR /app
COPY --chown=node:node . .
RUN pnpm install --frozen-lockfile
# RUN pnpx nx run remote-state-server:build:production
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18 As build
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
WORKDIR /app
COPY --chown=node:node package.json pnpm-lock.yaml ./
COPY --chown=node:node src/database/prisma ./prisma/
COPY --chown=node:node --from=development /app/dist/ .
ENV NODE_ENV production
RUN pnpm install --prod --frozen-lockfile
USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

WORKDIR /app
COPY --chown=node:node --from=build /app .

RUN apk add --update --no-cache openssl1.1-compat curl
# We don't have the existing sqlite file
# So, we will create a fresh sqlite every time when build
# This migration should be run every time when build
RUN npx prisma migrate deploy
# Prepare prima library
RUN npx prisma generate

# Clean up with https://github.com/tj/node-prune
RUN curl -sf https://gobinaries.com/tj/node-prune | sh

# Run cleanup necessary dependencies Ref: Fix npm by https://bobbyhadz.com/blog/npm-fix-the-upstream-dependency-conflict-installing-npm-packages
# RUN npm prune --force --legacy-peer-deps --production
RUN /usr/local/bin/node-prune

# remove unused dependencies
# https://tsh.io/blog/reduce-node-modules-for-better-performance/
# https://medium.com/@alpercitak/nest-js-reducing-docker-container-size-4c2672369d30
RUN rm -rf node_modules/rxjs/src/
RUN rm -rf node_modules/rxjs/bundles/
RUN rm -rf node_modules/rxjs/_esm5/
RUN rm -rf node_modules/rxjs/_esm2015/
RUN rm -rf node_modules/swagger-ui-dist/*.map

ENV PORT=4352
EXPOSE ${PORT}

CMD [ "node", "main.js" ]