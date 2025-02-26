import { Module } from '@nestjs/common';
import { LocationModule } from './location/location.module';
import { CitiesModule } from './location/cities/cities.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { CountriesModule } from './location/countries/countries.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // MongooseModule.forRoot(process.env.MONGO_URI),
    MongooseModule.forRoot(process.env.LOCATION_DB_URI),
    LocationModule,
    CitiesModule,
    CountriesModule,
  ],
})
export class LocationServiceModule {}
