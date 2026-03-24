import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuditService } from './audit.service';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { Roles } from 'src/aut/decorators/roles.decorator';

@Roles('ADMIN') // Solo ADMIN puede acceder a este controlador
@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}


 @Get()
  findAll() {// AUDITORÍA
    return this.auditService.findAll();
  }
}