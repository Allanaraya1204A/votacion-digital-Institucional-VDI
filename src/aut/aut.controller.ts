import { Controller, Get, Post, Body, HttpCode,HttpStatus } from '@nestjs/common';
import { AutService } from './aut.service';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login-dto';
@Controller('aut')
export class AutController {
  constructor(private readonly autService: AutService) {}

  @Public() // Marcamos esta ruta como pública, no requiere autenticación
  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.autService.login(loginDto.email, loginDto.password);
  }
}
