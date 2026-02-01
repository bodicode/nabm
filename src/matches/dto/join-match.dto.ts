import { ApiProperty } from '@nestjs/swagger';

export class JoinMatchDto {
    @ApiProperty({ example: 'uuid-of-match' })
    matchId: string;
}
