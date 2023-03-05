import { Injectable } from '@nestjs/common';
import { Prisma, Team } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.TeamCreateInput) {
    return this.prisma.team.create({
      data: { ...data },
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TeamWhereUniqueInput;
    where?: Prisma.TeamWhereInput;
    orderBy?: Prisma.TeamOrderByWithRelationInput;
  }): Promise<Team[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.TeamWhereUniqueInput): Promise<Team | null> {
    return this.prisma.team.findUnique({
      where,
    });
  }

  async update(params: {
    where: Prisma.TeamWhereUniqueInput;
    data: Prisma.TeamUpdateInput;
  }): Promise<Team> {
    const { where, data } = params;
    return this.prisma.team.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.TeamWhereUniqueInput): Promise<void> {
    await this.prisma.team.delete({
      where,
    });
  }
}
