import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRepertoireDto } from './dto/create-repertoire.dto';
import { UpdateRepertoireDto } from './dto/update-repertoire.dto';

@Injectable()
export class RepertoiresService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRepertoireDto) {
    return this.prisma.repertory.create({
      data,
    });
  }

  findAll() {
    return `This action returns all repertoires`;
  }

  findOne(id: number) {
    return `This action returns a #${id} repertoire`;
  }

  update(id: number, updateRepertoireDto: UpdateRepertoireDto) {
    return `This action updates a #${id} repertoire`;
  }

  remove(id: number) {
    return `This action removes a #${id} repertoire`;
  }
}
