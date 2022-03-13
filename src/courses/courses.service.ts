import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>
  ) {}

  findAll() {
    //Aqui estou pedindo para ele retornar também as informações da outra tabela que o courses tem um relacionamento
    return this.courseRepository.find({
      relations: ['tags'],
    });
  }

  findOne(id: string) {
    //A função Number() é uma função nativa do Nest para converter uma variável para um número
    //Aqui estou pedindo para ele retornar também as informações da outra tabela que o courses tem um relacionamento
    const course = this.courseRepository.findOne(id, {
      relations: ['tags'],
    });

    if (!course) {
      throw new NotFoundException(`Course ID ${id} was not found!`,);
    }

    return course;
  }

  async create(createCourseDto: CreateCourseDto) {
    //Verificando se a tag já existe no banco
    const tags = await Promise.all(
      createCourseDto.tags.map(name => this.preloadTagByName(name)),
    );

    const course = this.courseRepository.create({
      ...createCourseDto,
      tags,
    });

    return this.courseRepository.save(course);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) { 
    const tags =
      updateCourseDto.tags && //Verificando se o usuário quer alterar uma tag
      (await Promise.all(
        updateCourseDto.tags.map((name) => this.preloadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      id: +id,
      ...updateCourseDto,
      tags,
    });

    if (!course) {
      throw new NotFoundException(`Course ID ${id} not found`);
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

  //Verificar se a tag já existe antes de criar uma nova
  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ name });

    if (tag) {
      return tag;
    }

    return this.tagRepository.create({ name }); 
  } 
}
