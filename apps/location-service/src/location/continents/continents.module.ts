import { Module } from '@nestjs/common';
import { ContinentsController } from './continents.controller';
import { ContinentsService } from './continents.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Continent, ContinentSchema } from './continent.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Continent.name, schema: ContinentSchema }
    ]),
  ],
  controllers: [ContinentsController],
  providers: [ContinentsService],
})
export class ContinentsModule { }
