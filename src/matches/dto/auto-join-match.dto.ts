import { ApiProperty } from '@nestjs/swagger';

export class AutoJoinMatchDto {
    @ApiProperty({ example: '3v3', description: 'Type of match: 3v3 or 5v5' })
    type: string;

    @ApiProperty({ example: 'Intermediate', description: 'Skill level' })
    level: string;

    @ApiProperty({ example: '2023-12-25T18:00:00.000Z', description: 'Desired start time' })
    startTime: Date;

    @ApiProperty({ example: 'uuid-court-id', required: false, description: 'Optional specific court' })
    courtId?: string;
}
