import { NestFactory } from '@nestjs/core';
import { SchedulerServiceModule } from './scheduler-service.module';

async function bootstrap() {
  const app = await NestFactory.create(SchedulerServiceModule);
  await app.listen(4000);
  console.log('Scheduler service is running on port 4000')
}
bootstrap();
