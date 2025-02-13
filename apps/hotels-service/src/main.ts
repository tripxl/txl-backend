import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { HotelServiceModule } from './hotel-service.module';

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(HotelServiceModule, {
    transport: Transport.GRPC,
    options: {
      package: 'hotels',
      protoPath: join(__dirname, '../proto/hotels.proto'),
      url: 'localhost:50053',
    },
  });

  await app.listen();
  console.log('Hotels service is running on gRPC port 50053');
}
bootstrap();
