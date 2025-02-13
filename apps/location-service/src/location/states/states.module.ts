import { Module } from '@nestjs/common';
import { StatesController } from './states.controller';
import { StatesService } from './states.service';
import { MongooseModule } from '@nestjs/mongoose';
import { State, StateSchema } from './state.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: State.name, schema: StateSchema },
    ]),
  ],
  controllers: [StatesController],
  providers: [StatesService],
})
export class StatesModule {}
