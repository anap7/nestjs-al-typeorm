import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  /*Como as tags é um array, vamos passar um objeto para o banco 
  e caso seja nulo o banco não retornara erros */
  @Column('json', { nullable: true})
  tags: string[];
}
