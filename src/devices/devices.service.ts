import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { PrismaService } from 'src/prisma-confi/prisma.service';
import { DeleteResponse, Devices } from './interface-devices';

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}
  async create(createDeviceDto: CreateDeviceDto): Promise<Devices> {
    const device = await this.prisma.dispositivos.create({
      data: createDeviceDto,
    });
    return device;
  }

   async findAll() : Promise<Devices[]> {
    const devices = await this.prisma.dispositivos.findMany();
    return devices;
  }

  async findOne(id: number): Promise<Devices> {
    const device = await this.prisma.dispositivos.findUniqueOrThrow({
      where: { id },
    });
    return device;  
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto): Promise<Devices> {
    const device = await this.prisma.dispositivos.update({
      where: { id },
      data: updateDeviceDto,
    });
    return device;
  }

  async updateStatus(id: number, activo: boolean): Promise<Devices> {
    const device = await this.prisma.dispositivos.update({
      where: { id },
      data: { activo },
    });
    return device;
  }

  async remove(id: number): Promise<DeleteResponse> {
    const device = await this.prisma.dispositivos.delete({
      where: { id },
    });
    return {
      success: true,
      message: 'Dispositivo eliminado exitosamente',
      data: { id: device.id, nombre: device.nombre }
    };
  }
}
