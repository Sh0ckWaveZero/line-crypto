FROM node:lts-alpine3.14

# SET Timezone (Asia/Bangkok GTM+07:00)
RUN apk add --no-cache tzdata
ENV TZ Asia/Bangkok
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src/app/linebot-crypto
COPY package.json ./
RUN yarn install
COPY . .

EXPOSE 4444

CMD ["yarn", "start"]
