import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { PricesModule } from './prices/prices.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductsModule,
    PricesModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbName = configService.get<string>('MONGO_DATABASE');
        const username = configService.get<string>('MONGO_USERNAME');
        const password = configService.get<string>('MONGO_PASSWORD');

        return {
          uri: `mongodb://${username}:${password}@localhost:27017`,
          dbName,
        };
      },
    }),
  ],
})
export class AppModule {}
