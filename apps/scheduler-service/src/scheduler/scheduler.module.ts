import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SchedulerService } from './scheduler.service';
import { SchedulerController } from './scheduler.controller';

import { City, CitySchema } from '../entities/city.entity';
import { State, StateSchema } from '../entities/state.entity';
import { Country, CountrySchema } from '../entities/country.entity';
import { Hotel, HotelSchema } from '../entities/hotel.entity';
import { Destination, DestinationSchema } from '../entities/destination.entity';
import { Continent, ContinentSchema } from '../entities/continent.entity';

@Module({
  imports: [
    // ✅ Connect to MasterDB (`dailystore`)
    MongooseModule.forRoot('mongodb://localhost:27017/dailystore', {
      connectionName: 'masterDBConnection',
    }),

    // ✅ Connect to LocationDB (`location_db`)
    MongooseModule.forRoot('mongodb://localhost:27017/location_db', {
      connectionName: 'locationDBConnection',
    }),

    // ✅ Connect to HotelDB (`hotel_db`)
    MongooseModule.forRoot('mongodb://localhost:27017/hotel_db', {
      connectionName: 'hotelDBConnection',
    }),

    // ✅ Register Models with `masterDBConnection`
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema },
      { name: City.name, schema: CitySchema },
      { name: State.name, schema: StateSchema },
      { name: Country.name, schema: CountrySchema },
      { name: Destination.name, schema: DestinationSchema },
      { name: Continent.name, schema: ContinentSchema },
    ], 'masterDBConnection'),

    // ✅ Register Models with `locationDBConnection`
    MongooseModule.forFeature([
      { name: City.name, schema: CitySchema },
      { name: State.name, schema: StateSchema },
      { name: Country.name, schema: CountrySchema },
      { name: Destination.name, schema: DestinationSchema },
      { name: Continent.name, schema: ContinentSchema },
    ], 'locationDBConnection'),

    // ✅ Register Models with `hotelDBConnection`
    MongooseModule.forFeature([
      { name: Hotel.name, schema: HotelSchema }
    ], 'hotelDBConnection'),
  ],
  controllers: [SchedulerController],
  providers: [SchedulerService],
})
export class SchedulerModule {}
