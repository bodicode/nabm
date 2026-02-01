import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { AutoJoinMatchDto } from './dto/auto-join-match.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a matchmaking post' })
  create(@Request() req, @Body() createMatchDto: CreateMatchDto) {
    return this.matchesService.create(createMatchDto, req.user.id);
  }

  @Post('find')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Auto find and join a match' })
  autoJoin(@Request() req, @Body() dto: AutoJoinMatchDto) {
    return this.matchesService.autoJoin(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Find matches with filters' })
  @ApiQuery({ name: 'level', required: false })
  @ApiQuery({ name: 'type', required: false })
  findAll(@Query() query) {
    return this.matchesService.findAll(query);
  }

  @Post(':id/join')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Join a match' })
  join(@Param('id') id: string, @Request() req) {
    return this.matchesService.join(id, req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get match details' })
  findOne(@Param('id') id: string) {
    return this.matchesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchesService.update(id, updateMatchDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.matchesService.remove(id);
  }
}
