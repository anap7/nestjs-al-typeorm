import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Course } from "./course.entity";

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //Relacionamento de muitos para muitos para a tabela Course
  @ManyToMany(() => Course, (course: Course) => course.tags)
  courses: Course[];
}
