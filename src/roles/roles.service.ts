import { Injectable, NotFoundException } from '@nestjs/common';
import { IRole } from './interface-roles';
import { PrismaService } from 'src/prisma-confi/prisma.service';


@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<IRole[]> {
    const roles = await this.prisma.roles.findMany();
    return roles;

  }

  async findOne(id: number): Promise<IRole> {
    const roles = await this.prisma.roles.findUnique({
      where: { id },
    });

    if (!roles) {
      throw new NotFoundException(`Role with id ${id} not found`);
    }
    return {
      id: roles.id,
      nombre: roles.nombre,
    };
  };
}
