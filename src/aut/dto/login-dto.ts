import { IsEmail, IsNotEmpty, IsString} from 'class-validator';

export class LoginDto {
    @IsEmail()
    @IsNotEmpty({ message: 'El correo electrónico es requerido' })
    @IsString({ message: 'El correo electrónico debe ser una cadena de texto' })
    email: string;

    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    password: string;
}