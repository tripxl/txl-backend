import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from './country.entity';
import { count } from 'console';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
  ) {}

  async getAllCountries() {
    const countries = await this.countryModel
      .find({}, { _id: 1, name: 1, isDomestic: 1 })
      .lean()
      .exec();

    return {
      countries: countries.map((country) => ({
        id: country._id.toString(),
        name: country.name,
        isDomestic: country.isDomestic,
      })),
    };
  }

  async getCountryById(id: string) {
    console.log(`🔍 Debug: Fetching Country with ID: ${id} from MongoDB...`);

    if (!id) {
      console.error('❌ Error: No ID provided to getCountryById.');
      return {}; // Return empty object if ID is missing
    }

    const country = await this.countryModel
      .findById(id, { _id: 1, name: 1, isDomestic: 1 })
      .exec();

    if (!country) {
      console.error(`❌ Error: No country found with ID ${id}`);
      return {};
    }

    console.log(`✅ Found Country: ${JSON.stringify(country)}`);

    return {
      id: country._id.toString(),
      name: country.name,
      isDomestic: country.isDomestic,
    };
  }
}
