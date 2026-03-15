import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma-confi/prisma.service';
import { DeleteStudentResponse, Student } from './interfaces-student';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) { }


  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = await this.prisma.estudiantes.create({
      data: {
        codigo: createStudentDto.codigo,
        nombres: createStudentDto.nombres,
        apellidos: createStudentDto.apellidos,
        grado: createStudentDto.grado
      },
    });

    return {
      id: student.id,
      codigo: student.codigo,
      nombres: student.nombres,
      apellidos: student.apellidos,
      grado: student.grado,
      ya_voto: student.ya_voto,
    };
  }

  async findAll(): Promise<Student[]> {
    const students = await this.prisma.estudiantes.findMany(
      {
        select: {
          id: true,
          codigo: true,
          nombres: true,
          apellidos: true,
          grado: true,
          ya_voto: true,
        }
      }
    );
    return students;
  }


  async findOne(id: number): Promise<Student> {
    const student = await this.prisma.estudiantes.findUniqueOrThrow({
      where: { id },

    });

    return {
      id: student.id,
      codigo: student.codigo,
      nombres: student.nombres,
      apellidos: student.apellidos,
      grado: student.grado,
      ya_voto: student.ya_voto,
    };
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const student = await this.prisma.estudiantes.update({
      where: { id },
      data: {
        codigo: updateStudentDto.codigo,
        nombres: updateStudentDto.nombres,
        apellidos: updateStudentDto.apellidos,
        grado: updateStudentDto.grado,
        ya_voto: updateStudentDto.ya_voto,
      },
    });

    return {
      id: student.id,
      codigo: student.codigo,
      nombres: student.nombres,
      apellidos: student.apellidos,
      grado: student.grado,
      ya_voto: student.ya_voto,
    };
  }

  async remove(id: number): Promise<DeleteStudentResponse> {
    const deletedStudent = await this.prisma.estudiantes.delete({
      where: { id },
    });
    return {
      success: true,
      message: 'Estudiante eliminado exitosamente',
      data: {
        id: deletedStudent.id,
        codigo: deletedStudent.codigo,
      },
    };
  }
}
