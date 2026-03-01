import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber, IsArray, Min } from 'class-validator';

export class CreateCourtDto {
    @ApiProperty({ example: 'My Basketball Court' })
    @IsNotEmpty({ message: 'Tên sân không được để trống' })
    @IsString({ message: 'Tên sân phải là chuỗi' })
    name: string;

    @ApiProperty({ example: 'Basketball', required: false })
    @IsOptional()
    @IsString({ message: 'Loại thể thao phải là chuỗi' })
    sportType?: string;

    @ApiProperty({ example: 'Full court', required: false })
    @IsOptional()
    @IsString({ message: 'Loại sân phải là chuỗi' })
    courtType?: string;

    @ApiProperty({ example: true, required: false })
    @Transform(({ value }) => value === 'true' || value === true)
    @IsOptional()
    @IsBoolean({ message: 'isIndoor phải là kiểu boolean' })
    isIndoor?: boolean;

    @ApiProperty({ example: 'Wooden', required: false })
    @IsOptional()
    @IsString({ message: 'Loại mặt sân phải là chuỗi' })
    floorType?: string;

    @ApiProperty({ example: 2, required: false })
    @Transform(({ value }) => parseInt(value, 10))
    @IsOptional()
    @IsNumber({}, { message: 'Số lượng sân phải là số' })
    numberOfCourts?: number;

    @ApiProperty({ example: '28m x 15m', required: false })
    @IsOptional()
    @IsString({ message: 'Kích thước phải là chuỗi' })
    dimensions?: string;

    @ApiProperty({ example: '123 Main St' })
    @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
    @IsString({ message: 'Địa chỉ phải là chuỗi' })
    address: string;

    @ApiProperty({ example: 10.762622, required: false })
    @Transform(({ value }) => parseFloat(value))
    @IsOptional()
    @IsNumber({}, { message: 'Vĩ độ phải là số' })
    latitude?: number;

    @ApiProperty({ example: 106.660172, required: false })
    @Transform(({ value }) => parseFloat(value))
    @IsOptional()
    @IsNumber({}, { message: 'Kinh độ phải là số' })
    longitude?: number;

    @ApiProperty({ example: 'District 7', required: false })
    @IsOptional()
    @IsString({ message: 'Quận/Huyện phải là chuỗi' })
    district?: string;

    @ApiProperty({ example: 'John Doe', required: false })
    @IsOptional()
    @IsString({ message: 'Tên người quản lý phải là chuỗi' })
    managerName?: string;

    @ApiProperty({ example: '0901234567', required: false })
    @IsOptional()
    @IsString({ message: 'Số điện thoại phải là chuỗi' })
    phoneNumber?: string;

    @ApiProperty({ example: 'manager@court.com', required: false })
    @IsOptional()
    @IsString({ message: 'Email phải là chuỗi' })
    email?: string;

    @ApiProperty({ example: 'https://zalo.me/0901234567', required: false })
    @IsOptional()
    @IsString({ message: 'Liên kết mạng xã hội phải là chuỗi' })
    socialLink?: string;

    @ApiProperty({ example: 100000 })
    @Transform(({ value }) => parseInt(value, 10))
    @IsNotEmpty({ message: 'Giá mỗi giờ không được để trống' })
    @IsNumber({}, { message: 'Giá mỗi giờ phải là số' })
    @Min(0, { message: 'Giá không được nhỏ hơn 0' })
    pricePerHour: number;

    @ApiProperty({ example: '50%', required: false })
    @IsOptional()
    @IsString({ message: 'Chính sách cọc phải là chuỗi' })
    deposit?: string;

    @ApiProperty({ example: 'Cancel before 24h to get 100% refund', required: false })
    @IsOptional()
    @IsString({ message: 'Chính sách hủy phải là chuỗi' })
    cancellationPolicy?: string;

    @ApiProperty({ example: ['CASH', 'MOMO'], required: false })
    @Transform(({ value }) => {
        if (value === undefined || value === '') return undefined;
        return Array.isArray(value) ? value : [value];
    })
    @IsOptional()
    @IsArray({ message: 'Phương thức thanh toán phải là mảng' })
    @IsString({ each: true, message: 'Mỗi phương thức thanh toán phải là chuỗi' })
    paymentMethods?: string[];

    @ApiProperty({ example: ['Lighting', 'Roof', 'Water dispenser'], required: false })
    @Transform(({ value }) => {
        if (value === undefined || value === '') return undefined;
        return Array.isArray(value) ? value : [value];
    })
    @IsOptional()
    @IsArray({ message: 'Tiện ích phải là mảng' })
    @IsString({ each: true, message: 'Mỗi tiện ích phải là chuỗi' })
    facilities?: string[];

    @ApiProperty({ example: 4.5, required: false })
    @Transform(({ value }) => parseFloat(value))
    @IsOptional()
    @IsNumber({}, { message: 'Đánh giá phải là số' })
    rating?: number;

    @ApiProperty({ example: 'A nice court with wooden floor', required: false })
    @IsOptional()
    @IsString({ message: 'Mô tả phải là chuỗi' })
    description?: string;

    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, required: false })
    @IsOptional()
    images?: string[];

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    video?: string;
}
