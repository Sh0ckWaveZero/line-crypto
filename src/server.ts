import 'dotenv/config';
import App from './app';
import validateEnv from './utils/validateEnv';
import IndexRoute from './routes/index.route';
import HealthcheckRoute from './routes/healthcheck.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new HealthcheckRoute(),
]);

app.listen();
