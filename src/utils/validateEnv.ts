import { cleanEnv, port, str } from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    LINE_MESSAGING_API: str(),
    LINE_CHANNEL_SECRET: str(),
    LINE_GET_CONTENT: str(),
    X_APT_KEY: str(),
    LINE_TOKEN: str(),
  });
}

export default validateEnv;
