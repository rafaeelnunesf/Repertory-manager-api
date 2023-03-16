import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RepertoiresService } from './repertoires.service';
import { CreateRepertoireDto } from './dto/create-repertoire.dto';
import { UpdateRepertoireDto } from './dto/update-repertoire.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('Repertoires')
@ApiHeader({
  name: 'Authorization',
  description: 'The access token',
  example: 'Bearer abc123',
  required: true,
})
@Controller('repertoires')
export class RepertoiresController {
  constructor(private readonly repertoiresService: RepertoiresService) {}

  @Post()
  create(@Body() createRepertoireDto: CreateRepertoireDto) {
    return this.repertoiresService.create(createRepertoireDto);
  }

  @Get()
  findAll() {
    return this.repertoiresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repertoiresService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRepertoireDto: UpdateRepertoireDto,
  ) {
    return this.repertoiresService.update(+id, updateRepertoireDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repertoiresService.remove(+id);
  }
}
