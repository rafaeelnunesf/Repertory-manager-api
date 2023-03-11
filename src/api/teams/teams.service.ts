import { Injectable } from '@nestjs/common';
import { Prisma, Team, TeamUser, User } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.TeamCreateInput, user: User) {
    return this.prisma.teamUser.create({
      data: {
        main: false,
        user: {
          connect: {
            id: user.id,
          },
        },
        team: {
          create: {
            name: data.name,
          },
        },
      },
    });
  }

  async addUser(params: { email: string; teamId: number }): Promise<void> {
    const { email, teamId } = params;

    const user = await this.prisma.user.findUnique({ where: { email } });

    await this.prisma.teamUser.create({
      data: {
        main: false,

        user: {
          connect: {
            id: user.id,
          },
        },
        team: {
          connect: {
            id: teamId,
          },
        },
      },
    });
  }

  async findAll(params: {
    userId?: number;
    skip?: number;
    take?: number;
    cursor?: Prisma.TeamUserWhereUniqueInput;
    orderBy?: Prisma.TeamUserOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, userId, orderBy } = params;

    const result = await this.prisma.teamUser.findMany({
      where: { userId },
      skip,
      take,
      cursor,
      orderBy,

      select: {
        team: {
          include: {
            users: {
              select: {
                main: false,
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
        main: true,
      },
    });

    return result.map((item) => {
      return {
        id: item.team.id,
        main: item.main,
        name: item.team.name,
        users: item.team.users.map((user) => {
          return {
            id: user.user.id,
            name: user.user.name,
            email: user.user.email,
          };
        }),
      };
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
