import { Controller, Get, Post, Body, HttpCode,HttpStatus } from '@nestjs/common';
import { AutService } from './aut.service';
import { Public } from './decorators/public.decorator';

@Controller('aut')
export class AutController {
  constructor(private readonly autService: AutService) {}

  @Public() // Marcamos esta ruta como pública, no requiere autenticación
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.autService.login(signInDto.email, signInDto.password);
  }
}
