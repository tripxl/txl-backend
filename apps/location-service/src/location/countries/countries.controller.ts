import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CountriesService } from './countries.service';

@Controller()
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @GrpcMethod('LocationService', 'GetAllCountries')
  getAllCountries() {
    console.log('✅ LocationService: GetAllCountries called');
    return this.countriesService.getAllCountries();
  }

  @GrpcMethod('LocationService', 'GetCountryById')
  async getCountryById(data: { id: string }) {
    console.log(`✅ CountriesService: Fetching country with ID: ${data.id}`);
    return this.countriesService.getCountryById(data.id);
  }
}
