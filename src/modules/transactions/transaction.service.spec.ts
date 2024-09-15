import { beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';

import { TransactionStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionService, PrismaService],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um nova transação', async () => {
    const createTransacionDto = {
      amount: 100.0,
      status: TransactionStatus.PENDING,
      paymentDate: new Date().toLocaleString(),
      checkoutId: '9c1b6744-299c-4d83-bcb5-17a64701775e',
      userId: '20d9987c-6999-4795-94f6-db6a74620038',
    };

    const result = await service.createTransaction(createTransacionDto);
    expect(result).toHaveProperty('id');
    expect(result.amount).toBe(createTransacionDto.amount * 0.95);
  });
});
