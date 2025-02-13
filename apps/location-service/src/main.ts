import { join } from 'path';
import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { LocationServiceModule } from './location-service.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(LocationServiceModule, {
    transport: Transport.GRPC,
    options: {
      package: 'location',
      protoPath: join(__dirname, '../proto/location.proto'),
      url: '0.0.0.0:50052',
    },
  });

  await app.listen().then(() => {
    console.log('✅ Location Service running on gRPC port 50052');
  }).catch(err => {
    console.error('❌ Location Service failed to start:', err);
  });
}
bootstrap();
