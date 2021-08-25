import { Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { StorageService } from 'src/utils/storage/storage.service';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productsRepository: Repository<Product>,
    private storageService: StorageService,
  ) {}

  async findAll() {
    const products = await this.productsRepository.find({
      order: { id: 'DESC' },
      where: {
        status: true,
        deleted: false,
        badge: null,
        date_start: LessThanOrEqual(new Date()),
        date_finish: MoreThanOrEqual(new Date()),
      },
    });

    const images = [];

    for (const product of products) {
      const url = await this.storageService.getPicture('Product', product.id);
      images.push({
        id: product.id,
        url: url,
      });
    }

    const data = products.map((product) => {
      return {
        id: product.code_product,
        type: 'products',
        date_start: product.date_start,
        date_finish: product.date_finish,
        description: product.description,
        image: images.find((image) => image.id == product.id)?.url,
        kind: product.kind == 0 ? 'delivery' : 'coupon',
        name: product.name,
        value: product.value,
        product_activity:
          product.quantities_purchased < product.quantity
            ? 'online'
            : 'finished',
        status: product.status,
      };
    });

    return data;
  }

  async findOne(id: number) {
    return await this.productsRepository.findOne(id);
  }
}
