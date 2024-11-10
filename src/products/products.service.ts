import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  async getById(): Promise<string> {
    return 'asd';
  }

  async getAll(): Promise<any> {
    return;
  }
}
