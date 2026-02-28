import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateCourtDto {
    @ApiProperty({ example: 'My Basketball Court' })
    name: string;

    @ApiProperty({ example: 'Basketball', required: false })
    sportType?: string;

    @ApiProperty({ example: 'Full court', required: false })
    courtType?: string;

    @ApiProperty({ example: true, required: false })
    @Transform(({ value }) => value === 'true' || value === true)
    isIndoor?: boolean;

    @ApiProperty({ example: 'Wooden', required: false })
    floorType?: string;

    @ApiProperty({ example: 2, required: false })
    @Transform(({ value }) => parseInt(value, 10))
    numberOfCourts?: number;

    @ApiProperty({ example: '28m x 15m', required: false })
    dimensions?: string;

    @ApiProperty({ example: '123 Main St' })
    address: string;

    @ApiProperty({ example: 10.762622, required: false })
    @Transform(({ value }) => parseFloat(value))
    latitude?: number;

    @ApiProperty({ example: 106.660172, required: false })
    @Transform(({ value }) => parseFloat(value))
    longitude?: number;

    @ApiProperty({ example: 'District 7', required: false })
    district?: string;

    @ApiProperty({ example: 'John Doe', required: false })
    managerName?: string;

    @ApiProperty({ example: '0901234567', required: false })
    phoneNumber?: string;

    @ApiProperty({ example: 'manager@court.com', required: false })
    email?: string;

    @ApiProperty({ example: 'https://zalo.me/0901234567', required: false })
    socialLink?: string;

    @ApiProperty({ example: 100000 })
    @Transform(({ value }) => parseInt(value, 10))
    pricePerHour: number;

    @ApiProperty({ example: '50%', required: false })
    deposit?: string;

    @ApiProperty({ example: 'Cancel before 24h to get 100% refund', required: false })
    cancellationPolicy?: string;

    @ApiProperty({ example: ['CASH', 'MOMO'], required: false })
    paymentMethods?: string[];

    @ApiProperty({ example: ['Lighting', 'Roof', 'Water dispenser'], required: false })
    facilities?: string[];

    @ApiProperty({ example: 4.5, required: false })
    @Transform(({ value }) => parseFloat(value))
    rating?: number;

    @ApiProperty({ example: 'A nice court with wooden floor', required: false })
    description?: string;

    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, required: false })
    images?: string[];

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    video?: string;
}
