import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { LocationModule } from './location/location.module';
import { HotelsModule } from './hotels/hotel.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true, 
    }),
    ClientsModule.register([
      {
        name: 'LOCATION_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'location',
          protoPath: join(__dirname, '../../proto/location.proto'),
          url: 'localhost:50052',
        },
      },
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
    LocationModule,
    HotelsModule
  ],
  exports: [ClientsModule],
})
export class ApiGatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
