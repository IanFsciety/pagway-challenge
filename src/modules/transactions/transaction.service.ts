import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction-dto';

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
        user: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.transaction.findUnique({
      where: { id },
      include: {
        checkout: true,
        user: true,
      },
    });
  }
}
