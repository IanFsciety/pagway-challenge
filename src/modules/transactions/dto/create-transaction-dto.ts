import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  checkoutId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}
