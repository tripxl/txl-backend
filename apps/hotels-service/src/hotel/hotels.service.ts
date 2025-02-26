import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel, HotelDocument } from './hotel.entity';
import { ClientGrpc } from '@nestjs/microservices';
import { delay, lastValueFrom, Observable } from 'rxjs';

interface CityResponse {
  id: string;
  name: string;
  country: { id: string; name: string };
  state: { id: string; name: string };
}

interface CountryResponse {
  id: string;
  name: string;
  isDomestic: string;
}

@Injectable()
export class HotelsService implements OnModuleInit {
  private locationService: any;

  constructor(
    @InjectModel(Hotel.name) private readonly hotelModel: Model<HotelDocument>,
    @Inject('LOCATION_PACKAGE') private readonly locationClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.locationService = this.locationClient.getService('LocationService');
  }

  async getAllHotels() {
    console.log('✅ Fetching hotels from MongoDB...');
    const hotels = await this.hotelModel.find({}, { _id: 1, name: 1 }).exec();
    return { hotels };
  }

  async findOne(id: string) {
    console.log(`✅ Fetching hotel by ID: ${id} from hotelDB...`);

    const hotel = await this.hotelModel
      .findById(id, { _id: 1, name: 1, city: 1, country: 1 })
      .exec();

    if (!hotel) {
      console.error(`❌ Error: Hotel with ID ${id} not found.`);
      return {};
    }

    // Fetch city details
    let cityDetails = null;
    if (hotel.city) {
      console.log(
        `🔍 Debug: Fetching City from LocationService for city ID: ${hotel.city.toString()}`,
      );
      const cityDetails$ = this.locationService.GetCityById({
        id: hotel.city.toString(),
      }) as Observable<CityResponse>;
      cityDetails = await lastValueFrom(cityDetails$);
      console.log(`✅ Received City Response: ${JSON.stringify(cityDetails)}`);
    }

    // Fetch country details
    let countryDetails = null;
    if (hotel.country) {
      console.log(
        `🔍 Debug: Fetching Country from LocationService for country ID: ${hotel.country.toString()}`,
      );
      const countryDetails$ = this.locationService.GetCountryById({
        id: hotel.country.toString(),
      }) as Observable<CountryResponse>;
      countryDetails = await lastValueFrom(countryDetails$);
      console.log(
        `✅ Received Country Response: ${JSON.stringify(countryDetails)}`,
      );
    }

    const response = {
      id: hotel._id.toString(),
      name: hotel.name,
      city: cityDetails
        ? {
            id: cityDetails.id,
            name: cityDetails.name,
          }
        : null,
      country: countryDetails
        ? {
            id: countryDetails.id,
            name: countryDetails.name,
            isDomestic: countryDetails.isDomestic,
          }
        : null,
    };

    console.log(
      `✅ Final Response Sent to API Gateway: ${JSON.stringify(response)}`,
    );

    return response;
  }
}
