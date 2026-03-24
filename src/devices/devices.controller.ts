import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Roles } from 'src/aut/decorators/roles.decorator';

@Roles('ADMIN')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) { }

  @Post()
  create(@Body() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(+id);
  }
  @Roles('SUPERVISOR', 'ADMIN')
  @Get('mesa/:id_mesa')
  findbymesa(@Param('id_mesa') id_mesa: string) {
    return this.devicesService.findbymesa(+id_mesa);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(+id, updateDeviceDto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('activo') activo: boolean) {
    return this.devicesService.updateStatus(+id, activo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devicesService.remove(+id);
  }
}
