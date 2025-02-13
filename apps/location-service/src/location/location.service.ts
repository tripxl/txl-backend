import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
  getHealthCheck(): string {
    return 'Location service is running!';
  }
}
