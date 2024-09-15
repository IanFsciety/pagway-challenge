import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';

@Controller('checkouts')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Throttle({ default: { limit: 1, ttl: 10000 } })
  @Post()
  async createCheckout(@Body() checkoutService: CreateCheckoutDto) {
    return this.checkoutService.createCheckout(checkoutService);
  }

  @Get(':id')
  findAllByUserId(@Param('id') userId: string) {
    return this.checkoutService.findAllByUserId(userId);
  }

  @Get('c/:id')
  findOne(@Param('id') id: string) {
    return this.checkoutService.findOne(id);
  }
}
