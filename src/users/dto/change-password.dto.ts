import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
    @ApiProperty({ example: 'oldPassword123', description: 'Current password' })
    currentPassword: string;

    @ApiProperty({ example: 'newPassword456', description: 'New password' })
    newPassword: string;
}
