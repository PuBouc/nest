import { Injectable } from '@nestjs/common';
import { AppServiceInterface } from '../app.service.interface';

@Injectable()
export class HomeService implements AppServiceInterface  {
  getHello(): string {
    return 'Hello Home!';
  }
}
