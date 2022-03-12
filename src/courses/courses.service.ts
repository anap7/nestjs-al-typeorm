import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ) {}

  findAll() {
    return this.courseRepository.find();
  }

  findOne(id: string) {
    //A função Number() é uma função nativa do Nest para converter uma variável para um número
    const course = this.courseRepository.findOne(id);

    if (!course) {
      throw new NotFoundException(`Course ID ${id} was not found!`,);
    }

    return course;
  }

  create(createCourseDto: CreateCourseDto) {
    const newCourse = this.courseRepository.create(createCourseDto);
    console.log("... Salvando o curso");
    console.log(newCourse);
    return this.courseRepository.save(newCourse);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    //Pré-carrega o objeto com as informações - Pega o objeto
    const course = await this.courseRepository.preload({
      id: +id, //Convertendo para número
      ...updateCourseDto
    });

    if (!course) {
      throw new NotFoundException(`Não foi possível atualizar os seus dados. O Course ID #${id} não foi encontrado`);
    }

    return this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepository.findOne(id);

    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`);
    }

    return this.courseRepository.remove(course);
  }
}
