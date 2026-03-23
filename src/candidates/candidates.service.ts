import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { PrismaService } from 'src/prisma-confi/prisma.service';
import { Candidate, deleteresponse } from './interfaces-candidates';

@Injectable()
export class CandidatesService {
  constructor( private prisma: PrismaService) {}
  async create(createCandidateDto: CreateCandidateDto) : Promise<Candidate>  {
    const candidate = await this.prisma.candidaturas.create({
      data: createCandidateDto,
    });
    return candidate;
  }

  async findAll() : Promise<Candidate[]> {
    const candidates = await this.prisma.candidaturas.findMany();
    return candidates;
  }

  async findOne(id: number) : Promise<Candidate>{
    const candidate = await this.prisma.candidaturas.findUniqueOrThrow({
      where: { id },
    });
    return candidate;
  }

  async findbyeleccion(eleccion_id: number) : Promise<Candidate[]> {
    const candidates = await this.prisma.candidaturas.findMany({
      where: { eleccion_id },
    });
    return candidates;
  }

  async update(id: number, updateCandidateDto: UpdateCandidateDto) : Promise<Candidate> {
    const candidate = await this.prisma.candidaturas.update({
      where: { id },
      data: updateCandidateDto,
    });
    return candidate;
  }

  async remove(id: number) : Promise<deleteresponse> {
    const candidate = await this.prisma.candidaturas.delete({
      where: { id },
    });
    return {
      success: true,
      message: 'Candidate deleted successfully',
      data: { id: candidate.id, nombre: candidate.nombre }
    };
  }
}
