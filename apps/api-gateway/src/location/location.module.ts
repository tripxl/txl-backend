import { Module } from '@nestjs/common';
import { CitiesModule } from './cities/cities.module';
import { CountriesModule } from './countries/countries.module';
import { DestinationsModule } from './destinations/destinations.module';
import { ContinentsModule } from './continents/continents.module';
import { StatesModule } from './states/states.module';

@Module({
  imports: [
    CitiesModule,
    CountriesModule,
    DestinationsModule,
    ContinentsModule,
    StatesModule
  ],
})
export class LocationModule {}
