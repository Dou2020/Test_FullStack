import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    MinLength,
    MaxLength,
    IsOptional,
    IsBoolean,
    IsArray,
    IsUrl,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePostDto {
    @ApiProperty({
        description: 'Título del post',
        example: 'Mi primer post actualizado',
        minLength: 3,
        maxLength: 200,
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'El título debe ser un texto' })
    @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
    @MaxLength(200, { message: 'El título no puede exceder 200 caracteres' })
    @Transform(({ value }) => value?.trim())
    title?: string;

    @ApiProperty({
        description: 'Contenido del post',
        example: 'Este es el contenido actualizado de mi post...',
        minLength: 10,
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'El contenido debe ser un texto' })
    @MinLength(10, { message: 'El contenido debe tener al menos 10 caracteres' })
    @Transform(({ value }) => value?.trim())
    body?: string;

    @ApiProperty({
        description: 'Autor del post',
        example: 'Juan Pérez',
        minLength: 2,
        maxLength: 100,
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'El autor debe ser un texto' })
    @MinLength(2, { message: 'El nombre del autor debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'El nombre del autor no puede exceder 100 caracteres' })
    @Transform(({ value }) => value?.trim())
    author?: string;

    @ApiProperty({
        description: 'Etiquetas del post',
        example: ['tecnología', 'programación'],
        type: [String],
        required: false,
    })
    @IsOptional()
    @IsArray({ message: 'Las etiquetas deben ser un arreglo' })
    @IsString({ each: true, message: 'Cada etiqueta debe ser un texto' })
    tags?: string[];

    @ApiProperty({
        description: 'URL de la imagen del post',
        example: 'https://www.neh.gov/sites/default/files/styles/featured_image_page/public/2018-06/openbooks.jpg?h=b69e0e0e&itok=s8jNjnkU',
        required: false,
    })
    @IsOptional()
    @IsUrl({}, { message: 'La URL de la imagen no es válida' })
    imageUrl?: string;

    @ApiProperty({
        description: 'Estado de publicación del post',
        example: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean({ message: 'El estado de publicación debe ser verdadero o falso' })
    published?: boolean;
}
