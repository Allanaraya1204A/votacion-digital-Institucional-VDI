import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { PrismaModule } from './prisma-confi/prisma.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    // cargar el ConfigModule de forma global
    ConfigModule.forRoot({  
      isGlobal: true, 
    }),
    PrismaModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}