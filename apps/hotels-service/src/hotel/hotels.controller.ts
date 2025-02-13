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

// @UseGuards(AuthGuard) 
// @Controller()
// export class HotelsController {
//   constructor(private readonly hotelsService: HotelsService) { }

//   @GrpcMethod('HotelsService', 'GetAllHotels')
//   async getAllHotels(@Request() req) {
//     console.log("📥 Request received in Hotel Service with user:", req.user);
//     console.log("✅ HotelsService: GetAllHotels called");
//     return this.hotelsService.getAllHotels();
//   }
