import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface DestinationsService {
  getAllDestinations(data: {}): Observable<{ destinations: { id: string; name: string }[] }>;
}

@Controller('location/destinations')
export class DestinationsController implements OnModuleInit {
  private destinationsService: DestinationsService;

  constructor(@Inject('LOCATION_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.destinationsService = this.client.getService<DestinationsService>('LocationService');
  }

  @Get()
  async getAllDestinations() {
    console.log("✅ API Gateway: Received request for GetAllDestinations...");

    try {
      const requestPayload = {}; // ✅ Ensure an empty object is sent (matches `Empty` message in .proto)
      const result = await this.destinationsService.getAllDestinations(requestPayload);
      console.log("✅ API Gateway: Received response from LocationService:", result);
      return result;
    } catch (error) {
      console.error("❌ API Gateway: Error calling LocationService:", error);
      throw error;
    }
  }
}
