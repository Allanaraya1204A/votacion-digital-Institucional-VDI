import { PartialType } from '@nestjs/mapped-types';
import { CreateMesaDto } from './create-mesa.dto';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateMesaDto extends PartialType(CreateMesaDto) {
    @IsBoolean()
    @IsNotEmpty({ message: 'El campo activa es requerido' })
    activa: boolean;
}
