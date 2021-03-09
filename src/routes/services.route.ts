import { Router } from 'express';
import ServicesController from '../controllers/services.controller';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';

class ServicesRoute implements Route {
  public path = '/services';
  public router = Router();
  public servicesController = new ServicesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.servicesController.getServices);
    this.router.get(`${this.path}/:name(*)`, this.servicesController.getServiceByName);
    // this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.servicesController.createUser);
    // this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateUserDto, 'body', true), this.servicesController.updateUser);
    // this.router.delete(`${this.path}/:id(\\d+)`, this.servicesController.deleteUser);
  }
}

export default ServicesRoute;
