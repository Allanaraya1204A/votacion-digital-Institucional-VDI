import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateMesaDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre es requerido' })
    nombre: string;
    @IsString()
    descripcion: string;
}
