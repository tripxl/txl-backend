import { join } from 'path';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DestinationsController } from './destinations.controller';

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
  controllers: [DestinationsController],
  exports: [ClientsModule]
})
export class DestinationsModule { }
