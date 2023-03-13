import { Injectable } from '@nestjs/common';
import { CreateRepertoireDto } from './dto/create-repertoire.dto';
import { UpdateRepertoireDto } from './dto/update-repertoire.dto';

@Injectable()
export class RepertoiresService {
  create(createRepertoireDto: CreateRepertoireDto) {
    return 'This action adds a new repertoire';
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
