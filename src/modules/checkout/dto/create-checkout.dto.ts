import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateCheckoutDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  cardNumber: string;

  @IsString()
  @IsNotEmpty()
  cardHolderName: string;

  @IsString()
  @IsNotEmpty()
  expirationDate: string;

  @IsString()
  @IsNotEmpty()
  cvv: string;

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
