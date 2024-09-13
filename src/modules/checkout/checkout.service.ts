import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

@Injectable()
export class CheckoutService {
  constructor(private prisma: PrismaService) {}

  createCheckout(createCheckoutDto: CreateCheckoutDto) {
    const {
      amount,
      description,
      cardNumber,
      cardHolderName,
      expirationDate,
      cvv,
      userId,
    } = createCheckoutDto;

    const lastFourDigits = `xxxxxxxxxxxx${cardNumber.slice(-4)}`;

    return this.prisma.checkout.create({
      data: {
        amount,
        description,
        cardNumber: lastFourDigits,
        cardHolderName,
        expirationDate,
        cvv,
        userId,
      },
    });
  }

  findAllByUserId(userId: string) {
    return this.prisma.checkout.findMany({
      where: {
        userId: userId,
      },
      include: {
        transactions: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.checkout.findUnique({
      where: { id },
      include: {
        transactions: true,
      },
    });
  }
}
