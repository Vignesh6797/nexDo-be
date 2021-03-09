import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import Routes from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import { logger, stream } from './utils/logger';
import mongoose from 'mongoose';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    const uri: string = `mongodb+srv://svp:Embarckle%4021@cluster0.75xal.mongodb.net/nexDo?authSource=admin&replicaSet=atlas-jbhguw-shard-0&readPreference=primary&retryWrites=true&w=majority`
    const options = { useNewUrlParser: true, useUnifiedTopology: true }
    mongoose.set("useFindAndModify", false)

    mongoose
      .connect(uri, options)
      .then(() =>
        this.app.listen(this.port, () => {
          logger.info(`🚀 App listening on the port ${this.port}`);
        })
      )
      .catch(error => {
        throw error
      })
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    if (this.env === 'production') {
      this.app.use(morgan('combined', { stream }));
      this.app.use(cors({ origin: 'your.domain.com', credentials: true }));
    } else if (this.env === 'development') {
      this.app.use(morgan('dev', { stream }));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeDB() {

    const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    const options = { useNewUrlParser: true, useUnifiedTopology: true }
    mongoose.set("useFindAndModify", false)

    mongoose
      .connect(uri, options)
      .then(() =>
        // app.listen(PORT, () =>
        //   console.log(`Server running on http://localhost:${PORT}`)
        // )
        console.log('Q')
      )
      .catch(error => {
        throw error
      })
  }

}

export default App;
