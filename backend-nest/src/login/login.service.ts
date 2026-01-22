import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { LoginDto, RegisterDto } from './dto/login.dto';

@Injectable()
export class LoginService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {
        // Verificar si el usuario ya existe
        const existingUser = await this.userModel.findOne({
            $or: [
                { username: registerDto.username },
                { email: registerDto.email }
            ]
        });

        if (existingUser) {
            throw new ConflictException('El usuario o email ya está registrado');
        }

        // Encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

        // Crear el usuario
        const newUser = new this.userModel({
            username: registerDto.username,
            name: registerDto.name,
            email: registerDto.email,
            password: hashedPassword,
        });

        await newUser.save();

        // Generar JWT
        return this.initSession(newUser);
    }

    async login(loginDto: LoginDto) {
        // Buscar usuario por username o email
        const user = await this.userModel.findOne({
            $or: [
                { username: loginDto.username },
                { email: loginDto.username }
            ],
            deleteAt: { $exists: false }
        });

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // Generar JWT
        return this.initSession(user);
    }

    initSession(user: User) {
        const payload = {
            sub: user._id,
            username: user.username,
            email: user.email,
            name: user.name,
        };

        const accessToken = this.jwtService.sign(payload);

        return {
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                name: user.name,
                email: user.email,
            },
        };
    }
}
