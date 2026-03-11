import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { PrismaModule } from './prisma-confi/prisma.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { PrismaClientExceptionFilter } from './common/filters/prisma-client-exception.filter';
import { APP_FILTER, APP_PIPE} from '@nestjs/core/constants';
import { ValidationPipe } from '@nestjs/common';

@Module({
  imports: [
    // cargar el ConfigModule de forma global
    ConfigModule.forRoot({  
      isGlobal: true, 
    }),
    PrismaModule,
    RolesModule,
    UsersModule,
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
    
  ],
})
export class AppModule {}