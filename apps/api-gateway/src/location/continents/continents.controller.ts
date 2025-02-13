import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface ContinentsService {
  getAllContinents(data: {}): Observable<{ continents: { id: string; name: string }[] }>;
}

@Controller('location/continents')
export class ContinentsController implements OnModuleInit {
  private continentsService: ContinentsService;

  constructor(@Inject('LOCATION_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.continentsService = this.client.getService<ContinentsService>('LocationService');
  }

  @Get()
  async getAllContinents() {
    console.log("✅ API Gateway: Received request for GetAllContinents...");

    try {
      const requestPayload = {}; // ✅ Ensure an empty object is sent (matches `Empty` message in .proto)
      const result = await this.continentsService.getAllContinents(requestPayload);
      console.log("✅ API Gateway: Received response from LocationService:", result);
      return result;
    } catch (error) {
      console.error("❌ API Gateway: Error calling LocationService:", error);
      throw error;
    }
  }
}
