import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot('mongodb://localhost:27017/taskdb'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
