import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    MinLength,
    MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePostDto {
    @ApiProperty({
        description: 'Título del post',
        example: 'Mi primer post',
        minLength: 3,
        maxLength: 200,
    })
    @IsString({ message: 'El título debe ser un texto' })
    @IsNotEmpty({ message: 'El título es requerido' })
    @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
    @MaxLength(200, { message: 'El título no puede exceder 200 caracteres' })
    @Transform(({ value }) => value?.trim())
    title: string;

    @ApiProperty({
        description: 'Contenido del post',
        example: 'Este es el contenido de mi post...',
        minLength: 10,
    })
    @IsString({ message: 'El contenido debe ser un texto' })
    @IsNotEmpty({ message: 'El contenido es requerido' })
    @MinLength(10, { message: 'El contenido debe tener al menos 10 caracteres' })
    @Transform(({ value }) => value?.trim())
    body: string;

    @ApiProperty({
        description: 'Autor del post',
        example: 'Juan Pérez',
        minLength: 2,
        maxLength: 100,
    })
    @IsString({ message: 'El autor debe ser un texto' })
    @IsNotEmpty({ message: 'El autor es requerido' })
    @MinLength(2, { message: 'El nombre del autor debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'El nombre del autor no puede exceder 100 caracteres' })
    @Transform(({ value }) => value?.trim())
    author: string;
}
