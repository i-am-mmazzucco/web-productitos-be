import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateProductBodyDto } from 'src/products/products.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendProductApprovalEmail(product: CreateProductBodyDto): Promise<void> {
    const approveUrl = `https://your-domain.com/api/products/approve?name=${encodeURIComponent(
      product.name,
    )}&imageUrl=${encodeURIComponent(product.imageUrl)}`;
    const rejectUrl = `https://your-domain.com/api/products/reject?name=${encodeURIComponent(
      product.name,
    )}`;

    await this.mailerService.sendMail({
      to: 'recipient@example.com',
      subject: 'New Product Pending Approval',
      template: 'email-template',
      context: {
        name: product.name,
        imageUrl: product.imageUrl,
        description: product.description || 'No description provided',
        category: product.category || 'No category specified',
        approveUrl,
        rejectUrl,
      },
    });
  }
}
