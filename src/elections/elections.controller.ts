import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElectionsService } from './elections.service';
import { CreateElectionDto } from './dto/create-election.dto';
import { UpdateElectionDto } from './dto/update-election.dto';
import { Roles } from 'src/aut/decorators/roles.decorator';


@Controller('elections')
export class ElectionsController {
  constructor(private readonly electionsService: ElectionsService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() createElectionDto: CreateElectionDto) {
    return this.electionsService.create(createElectionDto);
  }

  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.electionsService.findAll();
  }
  @Roles('USER', 'ADMIN')
  @Get('active')
  findActive() {
    return this.electionsService.findActive();
  }


  @Roles('ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.electionsService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElectionDto: UpdateElectionDto) {
    return this.electionsService.update(+id, updateElectionDto);
  }

  @Roles('ADMIN')
  @Patch(':id/deactivate')
  deactive(@Param('id') id: string) {
    return this.electionsService.deactive(+id);
}
}