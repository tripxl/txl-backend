import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { City, CityDocument } from './city.entity';
import { Model } from 'mongoose';

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {}

  async getAllCities() {
    console.log('✅ Fetching cities from MongoDB...');
    const cities = await this.cityModel
      .find({}, { _id: 1, name: 1 })
      .populate({ path: 'state', select: 'name' })
      .populate({ path: 'country', select: 'name' })
      .exec();
    return { cities };
  }

  async getCityById(id: string) {
    console.log(`🔍 Debug: Fetching City with ID: ${id} from MongoDB...`);

    if (!id) {
      console.error('❌ Error: No ID provided to getCityById.');
      return {}; // Return empty object if ID is missing
    }

    const city = await this.cityModel.findById(id, { _id: 1, name: 1 }).exec();

    if (!city) {
      console.error(`❌ Error: No city found with ID ${id}`);
      return {}; // Return empty object if no city is found
    }

    console.log(`✅ Found City: ${JSON.stringify(city)}`);

    return {
      id: city._id.toString(),
      name: city.name,
    };
  }
}
