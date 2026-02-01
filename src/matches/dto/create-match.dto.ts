import { ApiProperty } from '@nestjs/swagger';

export class CreateMatchDto {
    @ApiProperty({ example: '3v3' })
    type: string;

    @ApiProperty({ example: '2023-12-25T18:00:00.000Z' })
    startTime: Date;

    @ApiProperty({ example: '2023-12-25T20:00:00.000Z' })
    endTime: Date;

    @ApiProperty({ example: 'Intermediate', required: false })
    level?: string;

    @ApiProperty({ example: 2 })
    missingSlots: number;

    @ApiProperty({ example: 'Need a center', required: false })
    description?: string;

    @ApiProperty({ example: 'uuid-of-court' })
    courtId: string;
}
