import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
    @ApiProperty({ example: 'Golden State Warriors', description: 'Team Name' })
    name: string;

    @ApiProperty({ example: 'Intermediate', description: 'Team Skill Level', required: false })
    level?: string;

    @ApiProperty({ example: 'The best team in SF', description: 'Team Description', required: false })
    description?: string;
}
