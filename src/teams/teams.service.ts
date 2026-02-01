import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
constructor(private prisma: PrismaService) { }

  async create(createTeamDto: CreateTeamDto, userId: string) {
  return this.prisma.$transaction(async (prisma) => {
    // 1. Create the team
    const team = await prisma.team.create({
      data: {
        ...createTeamDto,
        captainId: userId, // Creator is initially stored as captainId reference
        members: {
          create: {
            userId,
            role: 'MANAGER', // Creator becomes MANAGER
            status: 'APPROVED', // Auto-approved
          },
        },
      },
      include: {
        members: true,
      },
    });

    return team;
  });
}

findAll() {
  return `This action returns all teams`;
}

findOne(id: number) {
  return `This action returns a #${id} team`;
}

update(id: number, updateTeamDto: UpdateTeamDto) {
  return `This action updates a #${id} team`;
}

remove(id: number) {
  return `This action removes a #${id} team`;
}
}
