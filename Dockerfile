FROM node:lts-alpine

# SET Timezone (Asia/Bangkok GTM+07:00)
ENV TZ Asia/Bangkok
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Copy package.json for install libraries
WORKDIR /usr/src/app/linebot-crypto
COPY package.json ./
RUN yarn set version stable && yarn install

COPY yarn.lock .yarn .yarnrc.yml ./
RUN yarn install
COPY . .

EXPOSE 4325

CMD ["yarn", "start"]
