import { Controller, Get, Param } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @GrpcMethod('HotelsService', 'GetAllHotels')
  getAllHotels() {
    console.log('✅ HotelsService: GetAllHotels called');
    return this.hotelsService.getAllHotels();
  }

  @GrpcMethod('HotelsService', 'FindOne')
  async findOne(data: { id: string }) {
    console.log(`HotelsService: Fetching hotel with ID: ${data.id}`);
    const result = await this.hotelsService.findOne(data.id);

    if (!result || Object.keys(result).length === 0) {
      console.error(`HotelsService: Empty response for hotel ID ${data.id}`);
      return {};
    }
    return result;
  }
}
