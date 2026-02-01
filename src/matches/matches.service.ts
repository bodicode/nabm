import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { AutoJoinMatchDto } from './dto/auto-join-match.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService) { }

  create(createMatchDto: CreateMatchDto, hostId: string) {
    return this.prisma.match.create({
      data: {
        ...createMatchDto,
        hostId,
        players: {
          create: { userId: hostId } // Host automatically joins the match
        }
      },
    });
  }

  findAll(query: any) {
    const { level, type, date } = query;
    const where: any = {};
    if (level) where.level = level;
    if (type) where.type = type;
    // Add more filters as needed

    return this.prisma.match.findMany({
      where,
      include: {
        court: true,
        host: { select: { id: true, name: true, avatar: true } },
        players: {
          include: {
            user: { select: { id: true, name: true, avatar: true, skillLevel: true } }
          }
        }
      }
    });
  }

  async autoJoin(dto: AutoJoinMatchDto, userId: string) {
    const { type, level, startTime, courtId } = dto;

    // 1. Find a suitable match
    const whereCondition: any = {
      type,
      level,
      status: 'OPEN',
      missingSlots: { gt: 0 },
      // Check for matches starting around the requested time (e.g., within 2 hours)
      startTime: {
        gte: new Date(new Date(startTime).getTime() - 2 * 60 * 60 * 1000), // -2 hours
        lte: new Date(new Date(startTime).getTime() + 2 * 60 * 60 * 1000), // +2 hours
      }
    };

    if (courtId) {
      whereCondition.courtId = courtId;
    }

    const match = await this.prisma.match.findFirst({
      where: whereCondition,
      orderBy: { startTime: 'asc' }
    });

    if (!match) {
      return {
        joined: false,
        message: 'No suitable match found. You can creating a new one!'
      };
    }

    // 2. Join the match
    await this.join(match.id, userId);

    return {
      joined: true,
      matchId: match.id,
      message: 'Successfully joined a match!'
    };
  }

  async join(matchId: string, userId: string) {
    // Check if user already joined
    const existing = await this.prisma.matchPlayer.findFirst({
      where: { matchId, userId }
    });
    if (existing) throw new BadRequestException('You already joined this match');

    const match = await this.prisma.match.findUnique({ where: { id: matchId } });
    if (!match) throw new BadRequestException('Match not found');
    if (match.missingSlots <= 0) throw new BadRequestException('Match is full');

    // Create MatchPlayer and Decrement slots transactionally
    await this.prisma.$transaction([
      this.prisma.matchPlayer.create({
        data: { matchId, userId }
      }),
      this.prisma.match.update({
        where: { id: matchId },
        data: { missingSlots: { decrement: 1 } }
      })
    ]);

    return { success: true };
  }

  findOne(id: string) {
    return this.prisma.match.findUnique({
      where: { id },
      include: {
        players: {
          include: { user: true }
        },
        court: true
      }
    });
  }

  update(id: string, updateMatchDto: UpdateMatchDto) {
    return this.prisma.match.update({
      where: { id },
      data: updateMatchDto,
    });
  }

  remove(id: string) {
    return this.prisma.match.delete({ where: { id } });
  }
}
