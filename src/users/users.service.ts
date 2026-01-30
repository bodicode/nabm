import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateUserDto): Promise<User> {
        return this.prisma.user.create({ data });
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findOne(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }
}
