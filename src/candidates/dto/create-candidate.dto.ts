import { IsNumber, IsString } from "class-validator";

export class CreateCandidateDto {
    @IsNumber()
    eleccion_id: number;
    @IsString()
    nombre: string;
    @IsString()
    descripcion: string;
    @IsString()
    imagen_url: string;
}
