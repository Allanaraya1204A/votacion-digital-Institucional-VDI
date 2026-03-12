import { Module } from '@nestjs/common';
import { AutService } from './aut.service';
import { AutController } from './aut.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    UsersModule,
    JwtModule.register({
  global: true,
  secret: process.env.JWT_SECRET, 
  signOptions: { 
    expiresIn: (process.env.JWT_EXPIRES_IN as any) || '1h' 
  },
}),
  ],
  controllers: [AutController],
  providers: [AutService],
})
export class AutModule {}
