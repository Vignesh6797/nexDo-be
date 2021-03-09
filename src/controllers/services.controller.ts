import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import { IService } from '../types/service';
import servicesService from '../services/services.service';

class ServicesController {

  public servicesService = new servicesService();

  public getServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllServicesData: IService[] = await this.servicesService.findAllServices();

      res.status(200).json({ data: findAllServicesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getServiceByName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const serviceName = req.params.name;
      const findOneServiceData: IService = await this.servicesService.findServiceByName(serviceName);

      res.status(200).json({ data: findOneServiceData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };
}

export default ServicesController;
