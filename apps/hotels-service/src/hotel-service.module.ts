import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { HotelsModule } from './hotel/hotels.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

dotenv.config()

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
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
        MongooseModule.forRoot(process.env.MONGO_URI),
        HotelsModule
    ],
})
export class HotelServiceModule { }
