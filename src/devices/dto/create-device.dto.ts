import {  IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDeviceDto {
    @IsNotEmpty()
    @IsNumber()
    mesa_id : number;
    @IsString()
    nombre : string
    @IsString()
    ip : string;
    @IsBoolean()
    activo : boolean;
}
