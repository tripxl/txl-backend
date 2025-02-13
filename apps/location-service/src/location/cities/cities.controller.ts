import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CitiesService } from './cities.service';

@Controller()
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @GrpcMethod('LocationService', 'GetAllCities')
  getAllCities() {
    console.log("✅ LocationService: GetAllCities called");
    return this.citiesService.getAllCities();
  }
}
