import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma-confi/prisma.service';

@Injectable()
export class VotingService {
  constructor(private prisma: PrismaService) {}

 // AUTORIZAR VOTO
  async authorizeVoting(estudiante_id: number, dispositivo_id: number) {
    return this.prisma.$transaction(async (tx) => {

      // 1. Obtener elección activa
      const election = await tx.elecciones.findFirst({
        where: { activa: true },
      });

      if (!election) {
        throw new BadRequestException('No hay elección activa');
      }

      // 2. Validar si el estudiante ya votó en esta elección
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

      // 3. Validar si el estudiante ya tiene autorización activa
      const existingAuth = await tx.autorizaciones_voto.findFirst({
        where: {
          estudiante_id,
          usada: false,
        },
      });

      if (existingAuth) {
        throw new BadRequestException('El estudiante ya tiene autorización activa');
      }

      // 4. Crear autorización (la BD evita doble por dispositivo)
      return tx.autorizaciones_voto.create({
        data: {
          estudiante_id,
          dispositivo_id,
          eleccion_id: election.id,
          expira_en: new Date(Date.now() + 5 * 60 * 1000), // 5 minutos para votar
        },
      });
    });
  }

  // EMITIR VOTO
  async castVote(candidatura_id: number, dispositivo_id: number) {
    return this.prisma.$transaction(async (tx) => {

      // 1. Obtener elección activa
      const election = await tx.elecciones.findFirst({
        where: { activa: true },
      });

      if (!election) {
        throw new BadRequestException('No hay elección activa');
      }

      // 2. Buscar autorización activa del dispositivo
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

      // 3. Verificar expiración
      if (auth.expira_en < new Date()) {
        throw new BadRequestException('La autorización expiró');
      }

      // 🔒 4. Validación extra: evitar doble voto (seguridad)
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

      // 5. Registrar voto
      const voto = await tx.votos.create({
        data: {
          candidatura_id,
          eleccion_id: election.id,
          dispositivo_id,
        },
      });

      // 6. Marcar autorización como usada (libera dispositivo de votacion)
      await tx.autorizaciones_voto.update({
        where: { id: auth.id },
        data: { usada: true },
      });

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