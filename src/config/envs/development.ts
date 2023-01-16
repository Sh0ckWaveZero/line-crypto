export const config = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 4325,
  client: process.env.FRONTEND_URL || 'http://localhost:3000',
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'linebot',
  },
  line: {
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
    messagingApi: process.env.LINE_MESSAGING_API,
    getContentApi: process.env.LINE_GET_CONTENT,
    loginChannelId: process.env.LINE_LOGIN_CHANNEL_ID,
    loginChannelSecret: process.env.LINE_LOGIN_CHANNEL_SECRET,
  },
  cmc: {
    apiKey: process.env.CMC_API_KEY,
    url: process.env.CMC_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  openAi: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  iqAir: {
    apiKey: process.env.IQAIR_KEY,
  },
};
