import { Injectable } from '@nestjs/common';
import { CreateElectionDto } from './dto/create-election.dto';
import { UpdateElectionDto } from './dto/update-election.dto';
import { PrismaService } from 'src/prisma-confi/prisma.service';
import { Election } from './interfaces-elections';

@Injectable()
export class ElectionsService {
  constructor(private prisma : PrismaService) {}

  async create(createElectionDto: CreateElectionDto) : Promise<Election> {
    const election = await this.prisma.elecciones.create({
      data: createElectionDto,
    });
    return election;
  }

  async findAll() : Promise<Election[]> {
    const elections = await this.prisma.elecciones.findMany();
    return elections;
  }

  async findActive() : Promise<Election[]> {
    const elections = await this.prisma.elecciones.findMany({
      where: { activa: true },
    });
    return elections;
  }
  
  async findOne(id: number): Promise<Election> {
    const election = await this.prisma.elecciones.findUniqueOrThrow({
      where: { id },
    });
    return election;
  }

  async update(id: number, updateElectionDto: UpdateElectionDto): Promise<Election> {
    const election = await this.prisma.elecciones.update({
      where: { id },
      data: updateElectionDto,
    });
    return election;
  }

  async deactive(id: number): Promise<Election> {
    const election = await this.prisma.elecciones.update({
      where: { id },
      data: { activa: false },
    });
    return election;
  }
}

