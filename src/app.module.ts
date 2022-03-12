import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [CoursesModule],
  controllers: [AppController],
  //Todo service vem com o decorator Injectable para ser implementado em outras classes 
  providers: [AppService]
})
export class AppModule {}
