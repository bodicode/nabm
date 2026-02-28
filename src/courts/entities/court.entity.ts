import { Court as PrismaCourt } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class Court implements PrismaCourt {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    sportType: string;

    @ApiProperty({ required: false })
    courtType: string | null;

    @ApiProperty()
    isIndoor: boolean;

    @ApiProperty({ required: false })
    floorType: string | null;

    @ApiProperty()
    numberOfCourts: number;

    @ApiProperty({ required: false })
    dimensions: string | null;

    @ApiProperty()
    address: string;

    @ApiProperty({ required: false })
    latitude: number | null;

    @ApiProperty({ required: false })
    longitude: number | null;

    @ApiProperty({ required: false })
    district: string | null;

    @ApiProperty({ required: false })
    managerName: string | null;

    @ApiProperty({ required: false })
    phoneNumber: string | null;

    @ApiProperty({ required: false })
    email: string | null;

    @ApiProperty({ required: false })
    socialLink: string | null;

    @ApiProperty()
    pricePerHour: Decimal;

    @ApiProperty({ required: false })
    deposit: string | null;

    @ApiProperty({ required: false })
    cancellationPolicy: string | null;

    @ApiProperty()
    paymentMethods: string[];

    @ApiProperty()
    rating: number;

    @ApiProperty()
    facilities: string[];

    @ApiProperty({ required: false })
    description: string | null;

    @ApiProperty()
    images: string[];

    @ApiProperty({ required: false })
    video: string | null;

    @ApiProperty()
    ownerId: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
