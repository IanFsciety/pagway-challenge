import { TransactionStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateTransactionDto {
  @IsNotEmpty()
  @IsEnum(TransactionStatus, { message: 'Status must be PENDING or PAID' })
  status: TransactionStatus;
}
