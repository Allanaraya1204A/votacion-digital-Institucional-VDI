import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { PrismaModule } from './prisma-confi/prisma.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';
import { APP_FILTER, APP_PIPE} from '@nestjs/core/constants';
import { ValidationPipe } from '@nestjs/common';
import { AutModule } from './aut/aut.module';
import { APP_GUARD } from '@nestjs/core';
import { AutGuard } from './aut/aut.guard';
import { RolesGuard } from './aut/guards/roles.guard';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    // cargar el ConfigModule de forma global
    ConfigModule.forRoot({  
      isGlobal: true, 
    }),
    PrismaModule,
    RolesModule,
    UsersModule,
    AutModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },

    {
      provide: APP_GUARD,
      useClass: AutGuard,
    },  
    {      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    
  ],
})
export class AppModule {}