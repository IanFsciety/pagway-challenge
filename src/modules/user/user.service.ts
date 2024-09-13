import { ConflictException, Injectable } from '@nestjs/common';
import { TransactionStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const emailTaken = await this.prisma.user.findUnique({
      where: { email },
    });

    if (emailTaken) {
      throw new ConflictException('This email is already in use');
    }

    return this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }

  getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        checkouts: true,
        transactions: true,
      },
    });
  }

  async getBalances(
    userId: string,
  ): Promise<{ availableBalance: number; projectedBalance: number }> {
    const [paidTransactions, pendingTransactions] = await Promise.all([
      this.prisma.transaction.findMany({
        where: {
          userId: userId,
          status: TransactionStatus.PAID,
        },
      }),
      this.prisma.transaction.findMany({
        where: {
          userId: userId,
          status: TransactionStatus.PENDING,
        },
      }),
    ]);

    const availableBalance = paidTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0,
    );
    const projectedBalance = pendingTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0,
    );

    return { availableBalance, projectedBalance };
  }
}
