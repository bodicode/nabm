import { ApiProperty } from '@nestjs/swagger';

export class CreateCourtDto {
    @ApiProperty({ example: 'My Basketball Court' })
    name: string;

    @ApiProperty({ example: '123 Main St' })
    address: string;

    @ApiProperty({ example: 100000 })
    pricePerHour: number;

    @ApiProperty({ example: 'A nice court with wooden floor', required: false })
    description?: string;

    @ApiProperty({ example: ['url1', 'url2'], required: false })
    images?: string[];
}
