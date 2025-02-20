import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HotelsService } from './hotels.service';

@Controller()
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) { }

  @GrpcMethod('HotelsService', 'GetAllHotels')
  getAllHotels() {
    console.log("✅ HotelsService: GetAllHotels called");
    return this.hotelsService.getAllHotels();
  }
}
