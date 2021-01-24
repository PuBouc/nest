import { Inject } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { AppServiceInterface } from '../common/app.service.interface';

@Controller()
export class AppController {
  constructor(@Inject('AppService') readonly appService: AppServiceInterface) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
