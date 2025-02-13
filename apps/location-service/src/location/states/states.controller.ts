import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { StatesService } from './states.service';

@Controller()
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @GrpcMethod('LocationService', 'GetAllStates')
  getAllStates() {
    console.log("✅ LocationService: GetAllStates called");
    return this.statesService.getAllStates();
  }
}
