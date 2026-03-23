import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, DeleteUserResponse,UpdateUser} from './interface-users';
import { PrismaService } from 'src/prisma-confi/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password_hash, 10);
    const user = await this.prisma.usuarios.create({
      data: {
        nombre: createUserDto.nombre,
        email: createUserDto.email,
        password_hash: hashedPassword,
        rol_id: createUserDto.rol_id,
      },
    });
    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol_id: user.rol_id,
    };
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.usuarios.findMany(
      {select: {
        id: true,
        nombre: true,
        email: true,
        rol_id: true,
      }}
    );
    return users;
  }


  async findOne(id: number): Promise<User> {
    const user = await this.prisma.usuarios.findUniqueOrThrow({
      where: { id },
    });

    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol_id: user.rol_id,
    };
  }
async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  // 1. Preparamos un objeto con los datos básicos
  const data: any = {
    nombre: updateUserDto.nombre,
    email: updateUserDto.email,
    rol_id: updateUserDto.rol_id,
  };

  // 2. Solo hasheamos si el usuario envió una nueva contraseña
  if (updateUserDto.password_hash) {
    data.password_hash = await bcrypt.hash(updateUserDto.password_hash, 10);
  }

  // 3. Ejecutamos la actualización con los campos que existan
  const user = await this.prisma.usuarios.update({
    where: { id },
    data: data,
  });

  // 4. Retornamos el objeto limpio (sin el hash)
  return {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    rol_id: user.rol_id,
  };
}

    

  async remove(id: number): Promise<DeleteUserResponse> {
    
    const user = await this.prisma.usuarios.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'User deleted successfully',
      data: {
        id: user.id,
        nombre: user.nombre,
      }
    };
  }


async findByEmail(email: string) {
  const user = await this.prisma.usuarios.findUnique({
    where: { email },
    include: {
      roles: true, // Esto carga toda la relación del rol (id y nombre)
    },
  });

  if (!user) {
    throw new UnauthorizedException('El correo electrónico no existe.');
  }

  return user;
}
}