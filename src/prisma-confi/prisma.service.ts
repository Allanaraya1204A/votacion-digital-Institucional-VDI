import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private configService: ConfigService) {
    const connectionString = configService.get<string>('DATABASE_URL');

    // Validación de seguridad: si no hay URL, lanzamos un error claro
    if (!connectionString) {
      throw new Error('❌ DATABASE_URL no encontrada en las variables de entorno');
    }

    const pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false, // Necesario para Neon
      },
    });

    const adapter = new PrismaPg(pool);
    
    // Pasamos el adaptador al constructor de PrismaClient
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('🚀 Conexión a Neon (vía Adapter) exitosa');
    } catch (error) {
      console.error('❌ Error al conectar con Neon:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}