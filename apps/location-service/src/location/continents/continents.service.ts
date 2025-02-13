import { Injectable } from '@nestjs/common';
import { Continent, ContinentDocument } from './continent.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ContinentsService {
  constructor(
    @InjectModel(Continent.name)
    private readonly continentModel: Model<ContinentDocument>,
  ) { }

  async getAllContinents() {
    const continents = await this.continentModel
      .find({}, { _id: 1, name: 1 }).exec()
    return { continents };
  }
}
