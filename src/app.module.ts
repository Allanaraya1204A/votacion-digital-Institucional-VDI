import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma-confi/prisma.module';

@Module({
  imports: [
    // cargar el ConfigModule de forma global
    ConfigModule.forRoot({  
      isGlobal: true, 
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}