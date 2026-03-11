import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  constructor() {
    super();
  }
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002': { // Error de duplicados
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: 'Conflict: Unique constraint failed',
        });
        break;
      }
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;   // id no encontrado
        response.status(status).json({
          statusCode: status,
          message: `Record with the provided ID was not found`,
          error: 'Not Found',
        });
        break;
      }
      case 'P2003': {
        const status = HttpStatus.BAD_REQUEST; // 400 error de solicitud incorrecta
        response.status(status).json({
          statusCode: status,
          message: 'Relación inválida: Uno de los IDS proporcionados no existe en el sistema.',
        });
        break;
      }
      default:
        // pone a Nest maneje otros errores de Prisma por defecto
        super.catch(exception, host);
        break;
    }
  }
}
