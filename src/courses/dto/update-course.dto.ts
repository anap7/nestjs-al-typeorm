import { PartialType } from "@nestjs/mapped-types";
import { CreateCourseDto } from "./create-course.dto";

/**A Lib PartialType faz a validação parcial das propriedades do CreateCourseDto,
 * deixando como opcional vc atualiar uma, mais ou todas as propriedades
*/
export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
