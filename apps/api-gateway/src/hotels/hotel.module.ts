import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { HotelsController } from './hotel.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HOTELS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'hotels',
          protoPath: join(__dirname, '../../../proto/hotels.proto'),
          url: 'localhost:50053',
        },
      },
    ]),
  ],
  controllers: [HotelsController],
  exports: [ClientsModule]
})
export class HotelsModule {}
