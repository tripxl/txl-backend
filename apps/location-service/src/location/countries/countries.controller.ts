import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CountriesService } from './countries.service';

@Controller()
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @GrpcMethod('LocationService', 'GetAllCountries')
  getAllCountries() {
    console.log("✅ LocationService: GetAllCountries called");
    return this.countriesService.getAllCountries();
  }
}
