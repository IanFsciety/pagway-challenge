import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { UpdateTransactionDto } from './dto/update-transaction-dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  createTransaction(createTransactionDto: CreateTransactionDto) {
    const { amount, checkoutId, userId, status } = createTransactionDto;

    const paymentDate = new Date();
    paymentDate.setDate(paymentDate.getDate() + 30);

    const discountedAmount = amount * 0.95;

    return this.prisma.transaction.create({
      data: {
        amount: discountedAmount,
        status,
        paymentDate,
        checkoutId,
        userId,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.prisma.transaction.findMany({
      where: {
        userId: userId,
      },
      include: {
        checkout: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.transaction.findUnique({
      where: { id },
      include: {
        checkout: true,
      },
    });
  }

  async updateTransaction(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });

    if (transaction.status === 'PAID') {
      throw new BadRequestException(
        'Cannot update a transaction that is already PAID.',
      );
    }

    return this.prisma.transaction.update({
      where: {
        id,
      },
      data: {
        status: updateTransactionDto.status,
      },
    });
  }
}
