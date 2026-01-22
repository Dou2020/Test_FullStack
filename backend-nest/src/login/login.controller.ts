import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { LoginDto, RegisterDto } from './dto/login.dto';

@ApiTags('Autenticación')
@Controller('auth')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post('register')
    @ApiOperation({ summary: 'Registrar un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
    @ApiResponse({ status: 409, description: 'El usuario o email ya existe' })
    register(@Body() registerDto: RegisterDto) {
        return this.loginService.register(registerDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
    login(@Body() loginDto: LoginDto) {
        return this.loginService.login(loginDto);
    }
}
