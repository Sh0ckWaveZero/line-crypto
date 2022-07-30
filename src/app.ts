import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as logger from 'morgan';
import * as path from 'path';
import Routes from './interfaces/routes.interface';
import errorMiddleware from './middleware/error.middleware';
import rateLimit from 'express-rate-limit';

class App {
  public app: express.Application;
  public port: (string | number);
  public env: boolean;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV === 'production' ? true : false;

    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    // await getMongoDBClient();
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddleware() {
    this.app.use('/static', express.static(path.join(__dirname, 'assets')));
    if (this.env) {
      this.app.use(hpp());
      this.app.use(helmet.contentSecurityPolicy());
      this.app.use(helmet.crossOriginEmbedderPolicy());
      this.app.use(helmet.crossOriginOpenerPolicy());
      this.app.use(helmet.crossOriginResourcePolicy());
      this.app.use(helmet.dnsPrefetchControl());
      this.app.use(helmet.expectCt());
      this.app.use(helmet.frameguard());
      this.app.use(helmet.hidePoweredBy());
      this.app.use(helmet.hsts());
      this.app.use(helmet.ieNoOpen());
      this.app.use(helmet.noSniff());
      this.app.use(helmet.originAgentCluster());
      this.app.use(helmet.permittedCrossDomainPolicies());
      this.app.use(helmet.referrerPolicy());
      this.app.use(helmet.xssFilter());
      this.app.use(logger('combined'));
      const whitelist = [process.env.FRONTEND_URL];
      const corsOptions = {
        origin: function (origin: any, callback: any) {
          if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
          } else {
            callback(new Error('Not allowed by CORS'))
          }
        }
      }
      this.app.use(cors(corsOptions));
    } else {
      this.app.use(logger('dev'));
      this.app.use(cors({ origin: true, credentials: true }));
    }
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    const apiLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    })
    routes.forEach((route) => {
      this.app.use(route.path, apiLimiter);
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
