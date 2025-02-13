import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City, CityDocument } from './city.entity';
import { Model } from 'mongoose';

@Injectable()
export class CitiesService {
  constructor(
    @InjectModel(City.name) private cityModel: Model<CityDocument>) { }

  async getAllCities() {
    console.log("✅ Fetching cities from MongoDB...");
    const cities = await this.cityModel.find({}, { _id: 1, name: 1 })
      .populate({ path: 'state', select: 'name' })
      .populate({ path: 'country', select: 'name' })
      .exec();
    return { cities };
  }
}