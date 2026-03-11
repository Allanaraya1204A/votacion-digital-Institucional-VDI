import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, DeleteUserResponse,UpdateUser, CreateUser} from './interface-users';
import { PrismaService } from 'src/prisma-confi/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<CreateUser> {
    const hashedPassword = await bcrypt.hash(createUserDto.password_hash, 10);
    return this.prisma.usuarios.create({
      data: {
        ...createUserDto,
        password_hash: hashedPassword
      }
    });
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

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateUser> {
    const user = await this.prisma.usuarios.update({
      where: { id },
      data: {...updateUserDto
      },
    });
    
    return {
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
        nombre: user.nombre
      }
    };
  }
}