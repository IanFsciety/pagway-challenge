import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { TransactionStatus } from '@prisma/client';
import { CreateTransactionDto } from './dto/create-transaction-dto';
import { TransactionService } from './transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

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

  @Patch(':id')
  updateTransaction(
    @Param('id') id: string,
    @Body() updateTransactionDto: TransactionStatus,
  ) {
    return this.transactionService.updateTransaction(id, updateTransactionDto);
  }
}
