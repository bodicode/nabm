import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class CourtsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService
  ) { }

  async create(createCourtDto: CreateCourtDto, ownerId: string, files: { images?: Express.Multer.File[], video?: Express.Multer.File[] }) {
    // 1. Upload media files if they exist FIRST, outside of the database transaction!
    const imageUrls: string[] = [];
    let videoUrl: string | null = null;

    try {
      if (files?.images && files.images.length > 0) {
        const imagePromises = files.images.map(file => this.cloudinary.uploadFile(file, 'nabm/courts/images'));
        const imageResults = await Promise.all(imagePromises);
        imageResults.forEach(result => imageUrls.push(result.secure_url));
      }

      if (files?.video && files.video.length > 0) {
        const videoResult = await this.cloudinary.uploadFile(files.video[0], 'nabm/courts/videos');
        videoUrl = videoResult.secure_url;
      }
    } catch (error) {
      throw new BadRequestException('Failed to upload media files to Cloudinary');
    }

    // 2. Execute Database Operations inside a short-lived transaction
    return this.prisma.$transaction(async (tx) => {
      const courtData = {
        ...createCourtDto,
        ownerId,
      };

      if (imageUrls.length > 0) courtData.images = imageUrls;
      if (videoUrl) courtData.video = videoUrl;

      // Create the court
      const court = await tx.court.create({
        data: courtData,
      });

      // Upgrade the user's role to COURT_MANAGER
      await tx.user.update({
        where: { id: ownerId },
        data: { role: 'COURT_MANAGER' },
      });

      return court;
    });
  }

  findAll() {
    return this.prisma.court.findMany();
  }

  findOne(id: string) {
    return this.prisma.court.findUnique({ where: { id } });
  }

  update(id: string, updateCourtDto: UpdateCourtDto) {
    return this.prisma.court.update({
      where: { id },
      data: updateCourtDto,
    });
  }

  remove(id: string) {
    return this.prisma.court.delete({ where: { id } });
  }
}
