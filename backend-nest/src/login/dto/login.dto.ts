import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
    @ApiProperty({
        description: 'Nombre de usuario o email',
        example: 'johndoe',
    })
    @IsString({ message: 'El usuario debe ser un texto' })
    @IsNotEmpty({ message: 'El usuario es requerido' })
    @Transform(({ value }) => value?.trim())
    username: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'Password123!',
        minLength: 8,
    })
    @IsString({ message: 'La contraseña debe ser un texto' })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password: string;
}

export class RegisterDto {
    @ApiProperty({
        description: 'Nombre de usuario',
        example: 'johndoe',
        minLength: 3,
        maxLength: 30,
    })
    @IsString({ message: 'El nombre de usuario debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
    @Transform(({ value }) => value?.trim())
    username: string;

    @ApiProperty({
        description: 'Nombre completo del usuario',
        example: 'John Doe',
    })
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @Transform(({ value }) => value?.trim())
    name: string;

    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'usuario@ejemplo.com',
    })
    @IsString({ message: 'El email debe ser un texto' })
    @IsNotEmpty({ message: 'El email es requerido' })
    @Transform(({ value }) => value?.trim().toLowerCase())
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'Password123!',
        minLength: 8,
    })
    @IsString({ message: 'La contraseña debe ser un texto' })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password: string;
}