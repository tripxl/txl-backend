import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';

import { City, CitySchema } from '../entities/city.entity';
import { State, StateSchema } from '../entities/state.entity';
import { Country, CountrySchema } from '../entities/country.entity';
import { Hotel, HotelSchema } from '../entities/hotel.entity';
import { Destination, DestinationSchema } from '../entities/destination.entity';
import { Continent, ContinentSchema } from '../entities/continent.entity';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    @InjectConnection('masterDBConnection') private readonly masterDB: Connection,

    @InjectModel(City.name, 'locationDBConnection') private readonly cityModel: Model<City>,
    @InjectModel(State.name, 'locationDBConnection') private readonly stateModel: Model<State>,
    @InjectModel(Country.name, 'locationDBConnection') private readonly countryModel: Model<Country>,
    @InjectModel(Destination.name, 'locationDBConnection') private readonly destinationModel: Model<Destination>,
    @InjectModel(Continent.name, 'locationDBConnection') private readonly continentModel: Model<Continent>,
    @InjectModel(Hotel.name, 'hotelDBConnection') private readonly hotelModel: Model<Hotel>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async syncDatabases() {
    this.logger.log('Starting full database dump...');
    try {
      // ✅ Fetch Data from MasterDB (`dailystore`)
      const MasterHotelModel = this.masterDB.model<Hotel>('Hotel', HotelSchema);
      const MasterCityModel = this.masterDB.model<City>('City', CitySchema);
      const MasterStateModel = this.masterDB.model<State>('State', StateSchema);
      const MasterCountryModel = this.masterDB.model<Country>('Country', CountrySchema);
      const MasterDestinationModel = this.masterDB.model<Destination>('Destination', DestinationSchema);
      const MasterContinentModel = this.masterDB.model<Continent>('Continent', ContinentSchema);

      const masterHotels = await MasterHotelModel.find().lean();
      const masterCities = await MasterCityModel.find().lean();
      const masterStates = await MasterStateModel.find().lean();
      const masterCountries = await MasterCountryModel.find().lean();
      const masterDestinations = await MasterDestinationModel.find().lean();
      const masterContinents = await MasterContinentModel.find().lean();

      this.logger.log(`Fetched ${masterHotels.length} hotels`);
      this.logger.log(`Fetched ${masterCities.length} cities`);

      // ✅ Drop collections before inserting new data
      this.logger.log('Dropping old collections...');
      try {
        await this.hotelModel.db.dropCollection('hotels');
        await this.cityModel.db.dropCollection('cities');
        await this.stateModel.db.dropCollection('states');
        await this.countryModel.db.dropCollection('countries');
        await this.destinationModel.db.dropCollection('destinations');
        await this.continentModel.db.dropCollection('continents');
        this.logger.log('Collections dropped successfully.');
      } catch (error) {
        this.logger.warn('⚠️ Some collections might not exist yet, skipping drop step.');
      }

      // ✅ Re-insert entire collections
      this.logger.log('Starting full database dump...');

      await this.hotelModel.insertMany(masterHotels);
      await this.cityModel.insertMany(masterCities);
      await this.stateModel.insertMany(masterStates);
      await this.countryModel.insertMany(masterCountries);
      await this.destinationModel.insertMany(masterDestinations);
      await this.continentModel.insertMany(masterContinents);

      this.logger.log('✅ Database dump completed successfully.');
    } catch (error) {
      this.logger.error('❌ Database dump failed:', error);
    }
  }



  // ✅ FIX: Add this function to allow manual sync calls
  async manualSync() {
    this.logger.log('🔄 Running Manual Sync...');
    await this.syncDatabases();
  }
}
