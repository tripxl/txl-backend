import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ContinentsService } from './continents.service';

@Controller()
export class ContinentsController {
  constructor(private readonly continentsService: ContinentsService) {}

  @GrpcMethod('LocationService', 'GetAllContinents')
  getAllContinents() {
    console.log("✅ LocationService: GetAllContinents called");
    return this.continentsService.getAllContinents();
  }
}
