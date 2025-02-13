import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Country, CountryDocument } from './country.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name) private countryModel: Model<CountryDocument>,
  ) { }

  // getAllCountries() {
  //   console.log("✅ CountriesService: Fetching all countries...");
  //   return {
  //     countries: [
  //       { id: '1', name: 'USA' },
  //       { id: '2', name: 'Canada' },
  //     ],
  //   };
  // }


  async getAllCountries() {
    const countries = await this.countryModel
      .find({}, { _id: 1, name: 1, isDomestic: 1 })
      .lean()
      .exec();

    return {
      countries: countries.map(country => ({
        id: country._id.toString(),
        name: country.name,
        isDomestic: country.isDomestic
      }))
    };
  }
}
