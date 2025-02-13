import { Module } from '@nestjs/common';
import { CitiesModule } from './cities/cities.module';
import { CountriesModule } from './countries/countries.module';
import { DestinationsModule } from './destinations/destinations.module';
import { ContinentsModule } from './continents/continents.module';
import { StatesModule } from './states/states.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LOCATION_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'location',
          protoPath: join(__dirname, '../../../proto/location.proto'),
          url: 'localhost:50052',
        },
      },
    ]),
    CitiesModule,
    CountriesModule,
    DestinationsModule,
    ContinentsModule,
    StatesModule,
  ],
})
export class LocationModule {}
