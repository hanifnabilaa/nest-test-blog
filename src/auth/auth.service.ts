import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginInput, RegisterInput } from "./dto/auth.input";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { PrismaService } from "../prisma/prisma.service";


@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async register(input: RegisterInput) {
        // Hash password sebelum disimpan

        const hashedPassword = await bcrypt.hash(input.password, 10);

        const user = await this.prisma.user.create({
            data: {
                ...input,
                password: hashedPassword,
            },
        });

        return this.generateToken(user);
    }

    async login(input: LoginInput) {
        const user = await this.prisma.user.findUnique({
            where: { username: input.username }
        });

        if (!user) {
            throw new UnauthorizedException('Username atau password salah');
        }

        const isPasswordValid = await bcrypt.compare(input.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Username atau password salah');
        }

        return this.generateToken(user);
    }

    private generateToken(user: any) {
        const payload = { sub: user.id, username: user.username };
        return {
            accessToken: this.jwtService.sign(payload),
            user
        };
    }
}