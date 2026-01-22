import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    Matches,
    IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
    @ApiProperty({
        description: 'Nombre de usuario',
        example: 'johndoe',
        minLength: 3,
        maxLength: 30,
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'El nombre de usuario debe ser un texto' })
    @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
    @MaxLength(30, { message: 'El nombre de usuario no puede exceder 30 caracteres' })
    @Matches(/^[a-zA-Z0-9_-]+$/, { 
        message: 'El nombre de usuario solo puede contener letras, números, guiones y guiones bajos' 
    })
    @Transform(({ value }) => value?.trim())
    username?: string;

    @ApiProperty({
        description: 'Nombre completo del usuario',
        example: 'John Doe',
        minLength: 2,
        maxLength: 100,
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'El nombre debe ser un texto' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
    @Transform(({ value }) => value?.trim())
    name?: string;

    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'usuario@ejemplo.com',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'El email debe ser un texto' })
    @IsEmail({}, { message: 'El email debe tener un formato válido' })
    @MaxLength(100, { message: 'El email no puede exceder 100 caracteres' })
    @Transform(({ value }) => value?.trim().toLowerCase())
    email?: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'Password123!',
        minLength: 8,
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'La contraseña debe ser un texto' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(50, { message: 'La contraseña no puede exceder 50 caracteres' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        { 
            message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)' 
        }
    )
    password?: string;
}
