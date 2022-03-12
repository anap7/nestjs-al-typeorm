import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

//Endpoint /courses
@Controller('courses')
export class CoursesController {

  //Consumindo o service que trabalha com a camada de negócios
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  //Parâmetros na requisição + Via URL - jeito 1
  @Get(':id')
  findOne(@Param('id') id: string) {
   return this.coursesService.findOne(id);
  }

  //Trabalhando com os dados enviados no corpo da requisição
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  //Patch é utilizado para atualizar parcialmente
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
