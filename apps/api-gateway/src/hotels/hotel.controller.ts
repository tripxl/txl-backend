import { Controller, Get, Inject, OnModuleInit, Req, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';

interface HotelsService {
  getAllHotels(data: {}): Observable<{ hotels: { id: string; name: string; }[] }>;
}

@Controller('hotels')
export class HotelsController implements OnModuleInit {
  private hotelsService: HotelsService;

  constructor(@Inject('HOTELS_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.hotelsService = this.client.getService<HotelsService>('HotelsService');
  }

  
  @Get()
  async getAllHotels() {
    console.log("✅ API Gateway: Received request for GetAllHotels...");
    try {
      const requestFilter = {};
      const response = await this.hotelsService.getAllHotels(requestFilter);
      console.log("✅ API Gateway: Received response from HotelsService:", response);
      return response;
    } catch (error) {
      console.error('Error fetching hotels:', error);
      throw error;
    }
  }


  // @Get()
  // async getAllHotels() {
  //   console.log("✅ API Gateway: Received request for GetAllHotels...");
  //   try {
  //     const requestFilter = {};
  //     const response = await this.hotelsService.getAllHotels(requestFilter);
  //     console.log("✅ API Gateway: Received response from HotelsService:", response);
  //     return response;
  //   } catch (error) {
  //     console.error('Error fetching hotels:', error);
  //     throw error;
  //   }
  // }
}
