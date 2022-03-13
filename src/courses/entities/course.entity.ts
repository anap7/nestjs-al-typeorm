import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "./tag.entity";

//Dentro do parâmetro Entity você pode definir o nome da tabela 
@Entity('courses')
export class Course {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  //Criando um relacionamento com a tabela/entidade Tag
  @JoinTable()
  //Mostrando que essa propriedade tem relacionamento com a tabela TAG
  /*Primeiro parâmetro é indicar que a entidade desse relacionamento e o segundo qual é a 
  propriedade (foreign key) que está entre o relacionamento*/
  //Relacionamento de muitos para muitos para a tabela Course
  @ManyToMany(() => Tag, (tag: Tag) => tag.courses, { cascade: true })
  tags?: Tag[];
}
