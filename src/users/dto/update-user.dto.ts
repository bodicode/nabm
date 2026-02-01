import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ example: 'John Doe', required: false })
    name?: string;

    @ApiProperty({ example: 'avatar_url_here', required: false })
    avatar?: string;

    @ApiProperty({ example: 3, description: 'Skill level from 1 to 5', required: false })
    skillLevel?: number;

    @ApiProperty({ example: 'Ho Chi Minh City', required: false })
    location?: string;

    @ApiProperty({ example: 'Point Guard', required: false })
    position?: string;

    @ApiProperty({ example: '0901234567', required: false })
    phoneNumber?: string;
}
