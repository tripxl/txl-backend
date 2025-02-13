import { Controller, Get, Inject, OnModuleInit, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface CitiesService {
  getAllCities(data: {}): Observable<{ cities: { id: string; name: string }[] }>;
}

@Controller('location/cities')
export class CitiesController implements OnModuleInit {
  private citiesService: CitiesService;

  constructor(@Inject('LOCATION_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.citiesService = this.client.getService<CitiesService>('LocationService');
  }

  @Get()
  async getAllCities() {
    console.log("✅ API Gateway: Received request for GetAllCities...");
    try {
      const requestFilter = {};
      const result = await this.citiesService.getAllCities(requestFilter);
      console.log("✅ API Gateway: Received response from LocationService:", result);
      return result;
    } catch (error) {
      console.error("❌ API Gateway: Error calling LocationService:", error);
      throw error;
    }
  }
}
