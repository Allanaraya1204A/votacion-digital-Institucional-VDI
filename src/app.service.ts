import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma-confi/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  getEstudiantes() {
    return this.prisma.estudiantes.findMany();
  }
}
