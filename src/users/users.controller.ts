import { Controller, Get, Post, Body, UseGuards, Patch, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
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

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current user profile' })
    getMe(@Request() req) {
        return this.usersService.findById(req.user.id);
    }

    @Get()
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Get all users' })
    findAll() {
        return this.usersService.findAll();
    }

    @Patch('profile')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update user profile' })
    updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(req.user.id, updateUserDto);
    }

    @Patch('change-password')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Change user password' })
    changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
        return this.usersService.changePassword(req.user.id, changePasswordDto);
    }
}
