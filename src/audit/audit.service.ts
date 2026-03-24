import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-confi/prisma.service';
import { IAudit } from './dto/interface-audit';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<IAudit[]> {
    return this.prisma.auditoria.findMany({
      orderBy: {
        fecha: 'desc', //
      },
    });
  }


  async log(
    usuario_id: number | null,
    accion: string,
    descripcion: string,
  ): Promise<void> {
    await this.prisma.auditoria.create({
      data: {
        usuario_id,
        accion,
        descripcion,
      },
    });
  }
}