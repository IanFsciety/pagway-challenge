import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction-dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(createTransactionDto: CreateTransactionDto) {
    const { checkoutId, userId } = createTransactionDto;

    const now = new Date();

    const date = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
    );

    const dateString = date.toLocaleString();

    const paymentDate = new Date(date);
    paymentDate.setDate(paymentDate.getDate() + 30);

    const paymentDateString = paymentDate.toLocaleString();

    const amountCheckout = await this.prisma.checkout.findUnique({
      where: {
        id: checkoutId,
      },
      select: {
        amount: true,
      },
    });

    if (amountCheckout) {
      const discountedAmount = amountCheckout.amount * 0.95;
      return this.prisma.transaction.create({
        data: {
          amount: discountedAmount,
          status: 'PENDING',
          paymentDate: paymentDateString,
          checkoutId,
          userId,
          createdAt: dateString,
        },
      });
    } else {
      throw new BadRequestException('Checkout not found');
    }
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

  findAll() {
    return this.prisma.transaction.findMany();
  }

  findOne(id: string) {
    return this.prisma.transaction.findUnique({
      where: { id },
      include: {
        checkout: true,
      },
    });
  }

  async updateTransaction() {
    const now = new Date();
    const getDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
    );

    const formattedDate = getDate.toLocaleString();

    const transactionsToUpdate = await this.prisma.transaction.findMany({
      where: {
        paymentDate: {
          lte: formattedDate,
        },
        status: 'PENDING',
      },
    });

    if (transactionsToUpdate.length > 0) {
      const transactionsUpdated = await this.prisma.transaction.updateMany({
        where: {
          id: {
            in: transactionsToUpdate.map((t) => t.id),
          },
        },
        data: {
          status: 'PAID',
        },
      });
      return transactionsUpdated;
    }

    throw new BadRequestException('Sem transacoes para atualizar!');
  }
}
