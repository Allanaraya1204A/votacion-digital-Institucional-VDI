import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AutService {
  constructor( private UsersService: UsersService, private jwtService: JwtService) { }

  async login(email: string, pass: string) {
    const user = await this.UsersService.findByEmail(email);
   const isMatch = await bcrypt.compare(pass, user.password_hash);

  if (!isMatch) {
    throw new UnauthorizedException('Credenciales incorrectas');
  }
  const payload = { 
    sub: user.id, 
    email: user.email, 
    role: user.roles.nombre 
  };
  
  return {
    access_token: await this.jwtService.signAsync(payload),
  };

}
}
