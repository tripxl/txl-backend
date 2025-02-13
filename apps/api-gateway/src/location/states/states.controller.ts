import { Controller, Get, Inject, OnModuleInit, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface StatesService {
  getAllStates(data: {}): Observable<{ states: { id: string; name: string }[] }>;
}

@Controller('location/states')
export class StatesController implements OnModuleInit {
  private statesService: StatesService;

  constructor(
    @Inject('LOCATION_PACKAGE') private client: ClientGrpc
  ) { }

  onModuleInit() {
    this.statesService = this.client.getService<StatesService>('LocationService');
  }

  @Get()
  async getAllStates() {
    console.log("✅ API Gateway: Received request for GetAllStates...");

    try {
      const requestPayload = {};
      const result = await this.statesService.getAllStates(requestPayload);
      console.log("✅ API Gateway: Received response from LocationService:", result);
      return result;
    } catch (error) {
      console.error("❌ API Gateway: Error calling LocationService:", error);
      throw error;
    }
  }
}
