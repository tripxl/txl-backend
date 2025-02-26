import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';

interface HotelsServiceGrpc {
  getAllHotels(data: {}): Observable<{
    hotels: { id: string; name: string }[];
  }>;
  findOne(data: { id: string }): Observable<any>;
}

@Controller('hotels')
export class HotelsController implements OnModuleInit {
  private hotelsService: HotelsServiceGrpc;

  constructor(@Inject('HOTELS_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.hotelsService =
      this.client.getService<HotelsServiceGrpc>('HotelsService');
    console.log('✅ API Gateway: HotelsService gRPC client initialized');
  }

  @Get()
  async getAllHotels() {
    console.log('✅ API Gateway: Received request for GetAllHotels...');
    try {
      const response = await lastValueFrom(this.hotelsService.getAllHotels({}));
      console.log(
        '✅ API Gateway: Received response from HotelsService:',
        response,
      );
      return response;
    } catch (error) {
      console.error('Error fetching hotels:', error);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log(
      `✅ API Gateway: Received request for GetHotelById with ID: ${id}`,
    );

    try {
      const response = await lastValueFrom(this.hotelsService.findOne({ id }));
      console.log(
        `✅ API Gateway: Final Response from HotelsService:`,
        response,
      );

      if (!response || Object.keys(response).length === 0) {
        console.error(
          '❌ API Gateway: Empty response received from HotelsService.',
        );
        return {
          error:
            'Hotel not found or empty response received from HotelsService.',
        };
      }

      return response;
    } catch (error) {
      console.error('❌ API Gateway Error fetching hotel:', error);
      throw error;
    }
  }
}
