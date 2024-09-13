import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }
}
