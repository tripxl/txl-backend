import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DestinationsService } from './destinations.service';

@Controller()
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @GrpcMethod('LocationService', 'GetAllDestinations')
  getAllDestinations() {
    console.log("✅ LocationService: GetAllDestinations called");
    return this.destinationsService.getAllDestinations();
  }
}
