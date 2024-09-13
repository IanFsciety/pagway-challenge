import { TransactionStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsEnum(TransactionStatus, { message: 'Status must be PENDING or PAID' })
  status: TransactionStatus;

  @IsNotEmpty()
  @IsDateString()
  paymentDate: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  checkoutId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}
