import { Injectable, BadRequestException } from '@nestjs/common';
import { AuditService } from 'src/audit/audit.service';
import { PrismaService } from 'src/prisma-confi/prisma.service';

@Injectable()
export class VotingService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService
  ) {}

  // AUTORIZAR VOTO
  async authorizeVoting(
    estudiante_id: number,
    dispositivo_id: number,
    usuario_id: number // 👈 admin que autoriza
  ) {
    return this.prisma.$transaction(async (tx) => {

      const election = await tx.elecciones.findFirst({
        where: { activa: true },
      });

      if (!election) {
        throw new BadRequestException('No hay elección activa');
      }

      const alreadyVoted = await tx.autorizaciones_voto.findFirst({
        where: {
          estudiante_id,
          eleccion_id: election.id,
          usada: true,
        },
      });

      if (alreadyVoted) {
        throw new BadRequestException('El estudiante ya votó en esta elección');
      }

      const existingAuth = await tx.autorizaciones_voto.findFirst({
        where: {
          estudiante_id,
          usada: false,
        },
      });

      if (existingAuth) {
        throw new BadRequestException('El estudiante ya tiene autorización activa');
      }

      const auth = await tx.autorizaciones_voto.create({
        data: {
          estudiante_id,
          dispositivo_id,
          eleccion_id: election.id,
          expira_en: new Date(Date.now() + 5 * 60 * 1000),
        },
      });

      // AUDITORÍA 
      await this.auditService.log(
        usuario_id,
        'AUTORIZACION',
        `Usuario ${usuario_id} autorizó al estudiante ${estudiante_id} en el dispositivo ${dispositivo_id}`
      );

      return auth;
    });
  }

  // EMITIR VOTO
  async castVote(candidatura_id: number, dispositivo_id: number) {
    return this.prisma.$transaction(async (tx) => {

      const election = await tx.elecciones.findFirst({
        where: { activa: true },
      });

      if (!election) {
        throw new BadRequestException('No hay elección activa');
      }

      const auth = await tx.autorizaciones_voto.findFirst({
        where: {
          dispositivo_id,
          eleccion_id: election.id,
          usada: false,
        },
      });

      if (!auth) {
        throw new BadRequestException('No autorizado para votar');
      }

      if (auth.expira_en < new Date()) {
        throw new BadRequestException('La autorización expiró');
      }

      const alreadyVoted = await tx.autorizaciones_voto.findFirst({
        where: {
          estudiante_id: auth.estudiante_id,
          eleccion_id: election.id,
          usada: true,
        },
      });

      if (alreadyVoted) {
        throw new BadRequestException('El estudiante ya votó');
      }

      const voto = await tx.votos.create({
        data: {
          candidatura_id,
          eleccion_id: election.id,
          dispositivo_id,
        },
      });

      await tx.autorizaciones_voto.update({
        where: { id: auth.id },
        data: { usada: true },
      });

      // AUDITORÍA 
      await this.auditService.log(
        null,
        'VOTO',
        `Estudiante ${auth.estudiante_id} emitió su voto en el dispositivo ${dispositivo_id}`
      );

      return voto;
    });
  }

  // RESULTADOS
  async getResults() {
    const election = await this.prisma.elecciones.findFirst({
      where: { activa: true },
    });

    if (!election) {
      throw new BadRequestException('No hay elección activa');
    }

    return this.prisma.votos.groupBy({
      by: ['candidatura_id'],
      where: {
        eleccion_id: election.id,
      },
      _count: {
        candidatura_id: true,
      },
    });
  }
}