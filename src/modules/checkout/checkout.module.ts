import { Module } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';

@Module({
  providers: [CheckoutService, PrismaService],
  controllers: [CheckoutController],
})
export class CheckoutModule {}
