import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hotel, HotelDocument } from './hotel.entity';
import { Model } from 'mongoose';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name)
    private readonly hotelModel: Model<HotelDocument>,
    ) {}

  async getAllHotels() {
    console.log("✅ Fetching hotels from MongoDB...");
    const hotels = await this.hotelModel.find({}, { _id: 1, name: 1 }).exec();
    return {hotels}
  }
}
