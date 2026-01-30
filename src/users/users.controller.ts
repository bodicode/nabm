import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Create user' })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Get all users' })
    findAll() {
        return this.usersService.findAll();
    }
}
