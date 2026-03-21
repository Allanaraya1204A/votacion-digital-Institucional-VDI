import { IsBoolean, IsDateString, IsString } from "class-validator";

export class CreateElectionDto {
    @IsString()
    nombre: string;
    @IsDateString()
    fecha: Date;
    @IsBoolean()
    activa: boolean;
}
