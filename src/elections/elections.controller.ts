import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElectionsService } from './elections.service';
import { CreateElectionDto } from './dto/create-election.dto';
import { UpdateElectionDto } from './dto/update-election.dto';
import { Roles } from 'src/aut/decorators/roles.decorator';

@Roles('ADMIN')
@Controller('elections')
export class ElectionsController {
  constructor(private readonly electionsService: ElectionsService) {}


  @Post()
  create(@Body() createElectionDto: CreateElectionDto) {
    return this.electionsService.create(createElectionDto);
  }

 
  @Get()
  findAll() {
    return this.electionsService.findAll();
  }

  @Get('active')
  findActive() {
    return this.electionsService.findActive();
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.electionsService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElectionDto: UpdateElectionDto) {
    return this.electionsService.update(+id, updateElectionDto);
  }


  @Patch(':id/deactivate')
  deactive(@Param('id') id: string) {
    return this.electionsService.deactive(+id);
}
}