# FROM node:lts-alpine

# # SET Timezone (Asia/Bangkok GTM+07:00)
# ENV TZ Asia/Bangkok
# RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# # Copy package.json for install libraries
# WORKDIR /usr/src/app/linebot-crypto
# COPY package.json ./
# RUN yarn install
# COPY . .

# EXPOSE 4325

# CMD ["yarn", "start"]

###################
# BUILD FOR PRODUCTION
###################
FROM node:18-alpine as build

RUN apk add curl bash

# install node-prune (https://github.com/tj/node-prune)
RUN curl -sfL https://gobinaries.com/tj/node-prune | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

# Run the build command which creates the production bundle
RUN yarn run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

RUN yarn cache clean --force

# run node prune
RUN /usr/local/bin/node-prune

RUN apk add --update --no-cache \
  && rm -rf node_modules/rxjs/src/ \
  && rm -rf node_modules/rxjs/bundles/ \
  && rm -rf node_modules/rxjs/_esm5/ \
  && rm -rf node_modules/rxjs/_esm2015/ \
  && rm -rf node_modules/swagger-ui-dist/*.map \
  && rm -rf node_modules/@prisma/engines/ \
  && rm -rf node_modules/@prisma/engines-version \
  && rm -rf node_modules/prisma \
  # Remove cache
  && rm -rf /root/.cache/ \
  && rm -rf /root/.npm/ 
RUN apk del npm curl bash

USER node

# ###################
# # PRODUCTION
# ###################
FROM node:18-alpine AS deploy

# SET Timezone (Asia/Bangkok GTM+07:00)
ENV TZ Asia/Bangkok
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/package*.json /usr/src/app/
COPY --chown=node:node --from=build /usr/src/app/yarn.lock /usr/src/app/
COPY --chown=node:node --from=build /usr/src/app/dist/ /usr/src/app/dist/
COPY --chown=node:node --from=build /usr/src/app/node_modules/ /usr/src/app/node_modules/


CMD [ "node", "dist/app.js" ]
