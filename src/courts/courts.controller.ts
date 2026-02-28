import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CourtsService } from './courts.service';
import { CreateCourtDto } from './dto/create-court.dto';
import { UpdateCourtDto } from './dto/update-court.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('courts')
@Controller('courts')
export class CourtsController {
  constructor(private readonly courtsService: CourtsService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new court' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'images', maxCount: 10 },
    { name: 'video', maxCount: 1 },
  ]))
  create(
    @Request() req,
    @Body() createCourtDto: CreateCourtDto,
    @UploadedFiles() files: { images?: Express.Multer.File[], video?: Express.Multer.File[] }
  ) {
    return this.courtsService.create(createCourtDto, req.user.id, files);
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
