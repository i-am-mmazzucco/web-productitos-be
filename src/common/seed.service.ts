import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/schemas/products.schema';
import { Model } from 'mongoose';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async onModuleInit() {
    const productCount = await this.productModel.countDocuments().exec();

    if (productCount === 0) {
      console.log('Database is empty, seeding initial products...');

      const initialProducts: Product[] = [
        {
          id: 1,
          name: 'Coca Cola Original 2,25 Litros',
          imageUrl:
            'https://http2.mlstatic.com/D_NQ_NP_839337-MLU72637726591_112023-O.webp',
          prices: [],
          stores: [],
          coordinates: [1, 1],
          timestamp: new Date(),
        },
        {
          id: 2,
          name: 'Gaseosa Cola Pepsi 1.5 Lt',
          imageUrl:
            'https://http2.mlstatic.com/D_NQ_NP_992200-MLA79301539840_092024-O.webp',
          prices: [],
          stores: [],
          coordinates: [1, 1],
          timestamp: new Date(),
        },
        {
          id: 3,
          name: 'Gaseosa Tónica Schweppes',
          imageUrl:
            'https://http2.mlstatic.com/D_NQ_NP_905195-MLA76377082522_052024-O.webp',
          prices: [],
          stores: [],
          coordinates: [1, 1],
          timestamp: new Date(),
        },
        {
          id: 4,
          name: 'Dulce De Leche Clasico Milkaut Mediano',
          imageUrl:
            'https://http2.mlstatic.com/D_NQ_NP_609182-MLU75862596562_042024-O.webp',
          prices: [],
          stores: [],
          coordinates: [1, 1],
          timestamp: new Date(),
        },
        {
          id: 5,
          name: 'Chocolate Milka Con Almendras X 155grs',
          imageUrl:
            'https://http2.mlstatic.com/D_NQ_NP_831987-MLA74126700409_012024-O.webp',
          prices: [],
          stores: [],
          coordinates: [1, 1],
          timestamp: new Date(),
        },
        {
          id: 6,
          name: 'Tableta Chocolate Shot X 170 Gr',
          imageUrl:
            'https://http2.mlstatic.com/D_NQ_NP_960991-MLA47693601200_092021-O.webp',
          prices: [],
          stores: [],
          coordinates: [1, 1],
          timestamp: new Date(),
        },
        {
          id: 7,
          name: 'Relleno Untable Bon O Bon Mediano',
          imageUrl:
            'https://http2.mlstatic.com/D_NQ_NP_779305-MLA69887191325_062023-O.webp',
          prices: [],
          stores: [],
          coordinates: [1, 1],
          timestamp: new Date(),
        },
        {
          id: 8,
          name: 'Relleno Untable De Chocolate Aguila 3 En 1 Mediano',
          imageUrl:
            'https://http2.mlstatic.com/D_NQ_NP_761886-MLA69928653673_062023-O.webp',
          prices: [],
          stores: [],
          coordinates: [1, 1],
          timestamp: new Date(),
        },
        {
          id: 9,
          name: 'Azúcar Ledesma Clásica 1kg',
          imageUrl:
            'https://http2.mlstatic.com/D_NQ_NP_800432-MLA70937251527_082023-O.webp',
          prices: [],
          stores: [],
          coordinates: [1, 1],
          timestamp: new Date(),
        },
        {
          id: 10,
          name: 'Edulcorante Hileret Stevia en pastilla sin TACC frasco 300 u',
          imageUrl:
            'https://http2.mlstatic.com/D_NQ_NP_998306-MLU78050169900_082024-O.webp',
          prices: [],
          stores: [],
          coordinates: [1, 1],
          timestamp: new Date(),
        },
        {
          id: 11,
          name: 'Edulcorante Sidiet Clasico 200ml Sin Calorias sin tacc',
          imageUrl:
            'https://http2.mlstatic.com/D_NQ_NP_939798-MLU75173853038_032024-O.webp',
          prices: [],
          stores: [],
          coordinates: [1, 1],
          timestamp: new Date(),
        },
        {
          id: 12,
          name: 'Harina Pureza con levadura especial pizzas caseras 1kg',
          imageUrl:
            'https://http2.mlstatic.com/D_NQ_NP_833076-MLU75585729246_042024-O.webp',
          prices: [],
          stores: [],
          coordinates: [1, 1],
          timestamp: new Date(),
        },
        {
          id: 13,
          name: 'Harina Integral Pureza 1kg',
          imageUrl:
            'https://http2.mlstatic.com/D_NQ_NP_911811-MLA49960837578_052022-O.webp',
          prices: [],
          stores: [],
          coordinates: [1, 1],
          timestamp: new Date(),
        },
      ] as Product[];

      await this.productModel.insertMany(initialProducts);

      console.log('Seeding complete!');
    } else {
      console.log('Database already has data, skipping seeding.');
    }
  }
}
