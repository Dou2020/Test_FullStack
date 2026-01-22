import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsEmail,
    IsMongoId,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCommentDto {
    @ApiProperty({
        description: 'ID del post al que pertenece el comentario',
        example: '507f1f77bcf86cd799439011',
    })
    @IsMongoId({ message: 'El ID del post debe ser un ID de MongoDB válido' })
    @IsNotEmpty({ message: 'El ID del post es requerido' })
    postId: string;

    @ApiProperty({
        description: 'Nombre del autor del comentario',
        example: 'Juan Pérez',
        minLength: 2,
        maxLength: 100,
    })
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'El nombre no puede exceder 100 caracteres' })
    @Transform(({ value }) => value?.trim())
    name: string;

    @ApiProperty({
        description: 'Email del autor del comentario',
        example: 'juan.perez@example.com',
    })
    @IsEmail({}, { message: 'Debe proporcionar un email válido' })
    @IsNotEmpty({ message: 'El email es requerido' })
    @Transform(({ value }) => value?.trim().toLowerCase())
    email: string;

    @ApiProperty({
        description: 'Contenido del comentario',
        example: 'Excelente artículo, muy informativo.',
        minLength: 5,
        maxLength: 1000,
    })
    @IsString({ message: 'El contenido debe ser un texto' })
    @IsNotEmpty({ message: 'El contenido es requerido' })
    @MinLength(5, { message: 'El comentario debe tener al menos 5 caracteres' })
    @MaxLength(1000, { message: 'El comentario no puede exceder 1000 caracteres' })
    @Transform(({ value }) => value?.trim())
    body: string;
}
