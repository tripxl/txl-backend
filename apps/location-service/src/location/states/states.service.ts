import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { State, StateDocument } from './state.entity';
import { Model } from 'mongoose';

@Injectable()
export class StatesService {
  constructor(
    @InjectModel(State.name) private readonly stateModel: Model<StateDocument>,
  ) {}

  async getAllStates() {
    const states = await this.stateModel.find({}, { name: 1 })
      .populate({ path: 'country', select: 'name' }).exec()
    return { states };
  }
}
