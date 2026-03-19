import { Injectable } from '@nestjs/common';
import { CreateMesaDto } from './dto/create-mesa.dto';
import { UpdateMesaDto } from './dto/update-mesa.dto';
import { PrismaService } from 'src/prisma-confi/prisma.service';
import { mesas, responseDeleteMesa } from './interface-mesas';

@Injectable()
export class MesasService {
  constructor( private prisma: PrismaService) {}

  async create(createMesaDto: CreateMesaDto) : Promise<mesas> {
    const mesas = await this.prisma.mesas.create({
      data: {
        nombre: createMesaDto.nombre,
        descripcion: createMesaDto.descripcion
      },
    });
    return mesas;
  }

  async findAll() : Promise<mesas[]> {
    const mesas = await this.prisma.mesas.findMany();
    return mesas;
  }

  async findOne(id: number) : Promise<mesas> {
    const mesa = await this.prisma.mesas.findFirstOrThrow({
      where: { id },
    });
    return mesa;
  }

  async update(id: number, updateMesaDto: UpdateMesaDto) : Promise<mesas> {
    const mesa = await this.prisma.mesas.update({
      where: { id },
      data: {
        nombre: updateMesaDto.nombre,
        descripcion: updateMesaDto.descripcion,
        activa: updateMesaDto.activa,
      },
    });
    return mesa;
  }

  async remove(id: number) : Promise<responseDeleteMesa> {
    const mesa = await this.prisma.mesas.delete({
      where: { id },
    });
    return {
      success: true,
      message: 'Mesa eliminada exitosamente',
      data: { id: mesa.id, nombre: mesa.nombre }
    };
  }
}
