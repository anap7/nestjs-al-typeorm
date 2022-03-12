import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [CoursesModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'postgres',
    //Carregar automaticamente as entidades
    autoLoadEntities: true,
    //Criar as tabelas no banco de acordo com as entidades
    synchronize: true
  })],
  controllers: [AppController],
  //Todo service vem com o decorator Injectable para ser implementado em outras classes 
  providers: [AppService]
})
export class AppModule {}
