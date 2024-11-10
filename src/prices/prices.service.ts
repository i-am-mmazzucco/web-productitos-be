import { Injectable } from '@nestjs/common';

@Injectable()
export class PricesService {
  async getAllByProductId(): Promise<string> {
    return 'asd';
  }
}
