import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  priv
  private courses: Course[] = [
    {
      id: 12,
      name: "Fundamentos do Fremework NestJS",
      description: "Explicando os Fundamentos do Fremework NestJS",
      price: 10,
      tags: ["node.js", "nest.js", "javascript"]
    },
    {
      id: 33,
      name: 'Curso Java',
      description: "Explicando os Fundamentos do Fremework NestJS",
      price: 10,
      tags: ["node.js", "nest.js", "javascript"]
    },
    {
      id: 22,
      name: 'Curso PHP',
      description: "Explicando os Fundamentos do Fremework NestJS",
      price: 10,
      tags: ["node.js", "nest.js", "javascript"]
    }
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    //A função Number() é uma função nativa do Nest para converter uma variável para um número
    const course = this.courses.find((course: Course) => course.id === Number(id));

    if (!course) {
      throw new HttpException(
        `Course ID ${id} was not found!`,
         HttpStatus.NOT_FOUND
      );
    }

    return course;
  }

  create(createCourseDto: any) {
    this.courses.push(createCourseDto);
    return createCourseDto;
  }

  update(id: string, updateCourseDto: any) {
    const indexCourse = this.courses.findIndex(
      //A função Number() é uma função nativa do Nest para converter uma variável para um número
      (course) => course.id === Number(id),
    );

    this.courses[indexCourse] = updateCourseDto;
  }

  remove(id: string) {
    const indexCourse = this.courses.findIndex(
      //A função Number() é uma função nativa do Nest para converter uma variável para um número
      (course) => course.id === Number(id),
    );

    if (indexCourse >= 0) {
      this.courses.splice(indexCourse, 1);
    }
  }
}
