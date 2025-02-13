import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CitiesController } from './cities.controller';

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
  controllers: [CitiesController],
  exports: [ClientsModule],
})
export class CitiesModule {}
