import bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import HttpException from '../exceptions/HttpException';
import Service from '../models/services.model'
import { IService } from '../types/service';

class ServicesService {

  public async findAllServices(): Promise<IService[]> {
    const services: IService[] = await Service.find()
    return services;
  }

  public async findServiceByName(serviceName: string): Promise<IService> {
    const findService: IService = await Service.findOne({"name" :  serviceName});
    if (!findService) throw new HttpException(409, "Service not found");

    return findService;
  }

  
}

export default ServicesService;
