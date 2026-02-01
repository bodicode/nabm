import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);

        if (user && user.password && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async register(createUserDto: CreateUserDto) {
        const hashedPassword = createUserDto.password ? await bcrypt.hash(createUserDto.password, 10) : undefined;
        return this.usersService.create({
            ...createUserDto,
            password: hashedPassword,
        });
    }

    async validateGoogleUser(googleUser: any) {
        const user = await this.usersService.findOne(googleUser.email);
        if (user) {
            // User exists, update googleId if not set? Or just return
            return user;
        }
        // Create new user
        // Note: We need to handle this in UsersService to allow setting googleId
        // For now, let's just create with the data we have
        return this.usersService.create({
            email: googleUser.email,
            name: googleUser.name,
            avatar: googleUser.avatar,
            password: '', // Empty password for google users
            // You might need to add googleId to CreateUserDto or pass it separately
        } as any);
    }
}
