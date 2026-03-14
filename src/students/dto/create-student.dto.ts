import { IsString, IsNotEmpty} from 'class-validator';

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty({ message: 'El código es requerido' })
    codigo: string;

    @IsString()
    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombres: string;

    @IsString()
    @IsNotEmpty({ message: 'El apellido es requerido' })
    apellidos: string;

    @IsString()
    @IsNotEmpty({ message: 'El grado es requerido' })
    grado: string;


}
