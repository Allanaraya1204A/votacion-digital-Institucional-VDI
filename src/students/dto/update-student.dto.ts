import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
    @IsBoolean()
    @IsNotEmpty({ message: 'El campo ya_voto es requerido' })
    ya_voto: boolean;
}
