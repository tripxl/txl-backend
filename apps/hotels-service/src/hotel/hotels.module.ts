import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './hotel.entity';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
    ],
  controllers: [HotelsController],
  providers: [HotelsService],

})
export class HotelsModule { }
