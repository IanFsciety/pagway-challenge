import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { Cron } from '@nestjs/schedule';
import { Throttle } from '@nestjs/throttler';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Throttle({ default: { limit: 1, ttl: 10000 } })
  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Get(':id')
  findAllById(@Param('id') userId: string) {
    return this.transactionService.findAllByUserId(userId);
  }

  @Get('/t/:id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Cron('0 0 * * *')
  @Patch()
  async updateTransaction() {
    return this.transactionService.updateTransaction();
  }
}
