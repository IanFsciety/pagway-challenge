import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TransactionService, PrismaService],
  controllers: [TransactionController],
})
export class TransactionModule {}
