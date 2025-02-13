import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
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
  ],
  controllers: [CountriesController],
  exports: [ClientsModule]
})
export class CountriesModule { }
