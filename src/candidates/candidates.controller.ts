import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Roles } from 'src/aut/decorators/roles.decorator';
import { get } from 'http';


@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Roles('ADMIN') 
  @Post()
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidatesService.create(createCandidateDto);
  }

  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.candidatesService.findAll();
  }

  @Roles('ADMIN') 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidatesService.findOne(+id);
  }

// Solo SUPERVISOR y ADMIN pueden acceder a esta ruta
  @Get('eleccion/:eleccion_id')
  findbyeleccion(@Param('eleccion_id') eleccion_id: string) {
    return this.candidatesService.findbyeleccion(+eleccion_id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCandidateDto: UpdateCandidateDto) {
    return this.candidatesService.update(+id, updateCandidateDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.candidatesService.remove(+id);
  }
}
