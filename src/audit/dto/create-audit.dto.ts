import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateAuditDto {
    @IsNumber()
    usuario_id: number;
    @IsString()
    accion : string;
    @IsString()
    descripcion: string;
    @IsDateString()
    fecha: Date;
}
