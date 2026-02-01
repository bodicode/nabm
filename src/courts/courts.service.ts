import { Injectable } from '@nestjs/common';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CourtsService {
  constructor(private prisma: PrismaService) { }

  create(createCourtDto: CreateCourtDto, ownerId: string) {
    return this.prisma.court.create({
      data: {
        ...createCourtDto,
        ownerId,
      },
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
