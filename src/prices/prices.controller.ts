import { Controller, Get } from '@nestjs/common';
import { PricesService } from './prices.service';

@Controller()
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Get()
  async getAllByProductId(): Promise<string> {
    return this.pricesService.getAllByProductId();
  }
}
