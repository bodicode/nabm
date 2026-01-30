import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourtsService } from './courts.service';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('courts')
@Controller('courts')
export class CourtsController {
  constructor(private readonly courtsService: CourtsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new court' })
  create(@Body() createCourtDto: CreateCourtDto) {
    return this.courtsService.create(createCourtDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all courts' })
  findAll() {
    return this.courtsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a court by id' })
  findOne(@Param('id') id: string) {
    return this.courtsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a court' })
  update(@Param('id') id: string, @Body() updateCourtDto: UpdateCourtDto) {
    return this.courtsService.update(id, updateCourtDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a court' })
  remove(@Param('id') id: string) {
    return this.courtsService.remove(id);
  }
}
