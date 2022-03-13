import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Module({
  /*TypeOrmModule.forFeature() aguarda como parâmetro 
  a entidade referência para que o typeorm consiga 
  pegar todas as propriedades e criar suas respectivas
  colunas e tabelas*/
  imports: [TypeOrmModule.forFeature([Course, Tag])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
