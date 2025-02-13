import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Destination, DestinationDocument } from './destination.entity';
import { Model } from 'mongoose';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectModel(Destination.name)
    private readonly destinationModel: Model<DestinationDocument>,
  ) { }

  async getAllDestinations() {
    console.log("✅ DestinationsService: Fetching all destinations...");

    const destinations = await this.destinationModel
      .find({}, { _id: 1, name: 1, type: 1 })
      .lean()
      .exec();

    return {
      destinations: destinations.map(destination => ({
        id: destination._id.toString(),
        name: destination.name,
        type: destination.type
      }))
    };
  }
}
