import { Controller, Post } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';

@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Post('sync')
  async manualSync() {
    await this.schedulerService.manualSync();
    return { message: '🔄 Sync Started' };
  }
}
