import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateProductBodyDto } from 'src/products/products.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendProductApprovalEmail(product: CreateProductBodyDto): Promise<void> {
    const approveUrl = `http://localhost:3001/products/approve?name=${encodeURIComponent(
      product.name,
    )}&imageUrl=${encodeURIComponent(product.imageUrl)}${product.description ? `description=${encodeURIComponent(product.description)}` : ''}${product.description ? `category=${encodeURIComponent(product.category)}` : ''}`;
    const rejectUrl = `http://localhost:3001/products/reject`;

    try {
      return await this.mailerService.sendMail({
        from: '<b>Productitos',
        to: 'mateomazzucco53@gmail.com',
        subject: 'Nuevo producto pendiente a aprobar',
        template: 'new-product',
        context: {
          name: product.name,
          imageUrl: product.imageUrl,
          description: product.description || 'No cuenta con descripción.',
          category: product.category || 'No cuenta con categoria especifica.',
          approveUrl,
          rejectUrl,
        },
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}
