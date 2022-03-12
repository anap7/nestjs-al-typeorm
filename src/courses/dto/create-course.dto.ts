import { IsNumber, IsString } from "class-validator";

export class CreateCourseDto {
  //Por ser atualização, o usuário talvez não queria atualizar tudo, então as propriedades vão ser opicionais
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly price: number;

  /**Como a propriedade tags é um array, o each: true indica que é para validar os itens dentro
   * da lista e se estes são uma string
   */
  @IsString({ each: true}) 
  readonly tags: string[];
}
