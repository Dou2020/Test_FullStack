import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    MinLength,
    MaxLength,
    IsEmail,
    IsOptional,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCommentDto {
    @ApiProperty({
        description: 'Nombre del autor del comentario',
        example: 'Juan Pérez',
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
        description: 'Email del autor del comentario',
        example: 'juan.perez@example.com',
        required: false,
    })
    @IsOptional()
    @IsEmail({}, { message: 'Debe proporcionar un email válido' })
    @Transform(({ value }) => value?.trim().toLowerCase())
    email?: string;

    @ApiProperty({
        description: 'Contenido del comentario',
        example: 'Excelente artículo, muy informativo.',
        minLength: 5,
        maxLength: 1000,
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'El contenido debe ser un texto' })
    @MinLength(5, { message: 'El comentario debe tener al menos 5 caracteres' })
    @MaxLength(1000, { message: 'El comentario no puede exceder 1000 caracteres' })
    @Transform(({ value }) => value?.trim())
    body?: string;
}
