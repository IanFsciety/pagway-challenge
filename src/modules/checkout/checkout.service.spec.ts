import { beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../../prisma/prisma.service';
import { CheckoutService } from './checkout.service';

describe('CheckoutService', () => {
  let service: CheckoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckoutService, PrismaService],
    }).compile();

    service = module.get<CheckoutService>(CheckoutService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um novo checkout', async () => {
    const createCheckoutDto = {
      amount: 100.0,
      description: 'Test Checkout',
      cardNumber: '1234567812345678',
      cardHolderName: 'Ian gabriel',
      expirationDate: '12/25',
      cvv: '123',
      userId: '20d9987c-6999-4795-94f6-db6a74620038',
    };

    const result = await service.createCheckout(createCheckoutDto);
    expect(result).toHaveProperty('id');
    expect(result.amount).toBe(createCheckoutDto.amount);
  });
});
