import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface CountriesService {
  getAllCountries(data: {}): Observable<{ countries: { id: string; name: string }[] }>;
}

@Controller('location/countries')
export class CountriesController implements OnModuleInit {
  private countriesService: CountriesService;

  constructor(@Inject('LOCATION_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.countriesService = this.client.getService<CountriesService>('LocationService');
  }

  @Get()
  async getAllCountries() {
    console.log("✅ API Gateway: Received request for GetAllCountries...");

    try {
      const requestFilter = {}; // ✅ Ensure an empty object is sent (matches `Empty` message in .proto)
      const result = await this.countriesService.getAllCountries(requestFilter);
      console.log("✅ API Gateway: Received response from LocationService:", result);
      return result;
    } catch (error) {
      console.error("❌ API Gateway: Error calling LocationService:", error);
      throw error;
    }
  }
}
