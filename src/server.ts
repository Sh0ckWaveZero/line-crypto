import 'dotenv/config';
import App from './app';
import validateEnv from './utils/validateEnv';
import IndexRoute from './routes/index.route';
import HealthCheckRoute from './routes/healthCheck.route';
import LineRoute from './routes/line.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new HealthCheckRoute(),
  new LineRoute(),
]);

app.listen();
