import { Injectable } from '@nestjs/common';
import { AppServiceInterface } from '../app.service.interface';

@Injectable()
export class CarsService implements AppServiceInterface  {
  getHello(): string {
    return 'Hello Cars!';
  }
}
