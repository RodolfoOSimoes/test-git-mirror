import { Inject, Injectable } from '@nestjs/common';
import { Order } from 'src/entities/order.entity';
import { User } from 'src/entities/user.entity';
import { StorageService } from 'src/utils/storage/storage.service';
import { Repository } from 'typeorm';
import { rastrearEncomendas } from 'correios-brasil';

@Injectable()
export class OrderService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
    private storageService: StorageService,
  ) {}

  async findKind(user_id: number, kind: string) {
    const user = await this.userRepository.findOne(user_id, {
      relations: ['orders', 'orders.product'],
    });

    if (kind == 'delivery') {
      const orders = user.orders
        .filter((order: Order) => order.product.kind == 0)
        ?.sort((a, b) => b.id - a.id);

      const uniqueProductIds = [
        ...new Set(orders.map((item) => item.product.id)),
      ];

      const filteredProduct = [];

      uniqueProductIds.forEach((id) => {
        const order = orders.find((order) => order.product.id == id);
        filteredProduct.push(order.product);
      });

      const included = [];

      for (const product of filteredProduct) {
        const image = await this.storageService.getPicture(
          'Product',
          product.id,
        );
        included.push({
          date_finish: product.date_finish,
          date_start: product.date_start,
          description: product.description,
          image: image,
          kind: 'delivery',
          name: product.name,
          product_activity: 'online',
          status: product.status,
          value: product.value,
          id: product.code_product,
          type: 'products',
        });
      }

      const data = orders.map((order) => {
        return {
          id: order.id,
          type: 'orders',
          code_secret: order.code_secret,
          kind: 'delivery',
          created_at: order.created_at,
          price_of_product: order.price_of_product,
          sent: order.sent,
          tracking_code: order.tracking_code,
          relationships: {
            product: {
              id: order.product?.code_product,
              type: 'products',
            },
          },
        };
      });
      return {
        data,
        included,
      };
    }

    if (kind == 'coupon') {
      const orders = user.orders
        .filter((order: Order) => order.product.kind == 1)
        ?.sort((a, b) => b.id - a.id);

      const uniqueProductIds = [
        ...new Set(orders.map((item) => item.product.id)),
      ];

      const filteredProduct = [];

      uniqueProductIds.forEach((id) => {
        const order = orders.find((order) => order.product.id == id);
        filteredProduct.push(order.product);
      });

      const included = [];

      for (const product of filteredProduct) {
        const image = await this.storageService.getPicture(
          'Product',
          product.id,
        );
        included.push({
          date_finish: product.date_finish,
          date_start: product.date_start,
          description: product.description,
          image: image,
          kind: 'delivery',
          name: product.name,
          product_activity: 'online',
          status: product.status,
          value: product.value,
          id: product.code_product,
          type: 'products',
        });
      }

      const data = orders.map((order) => {
        return {
          id: order.id,
          type: 'orders',
          code_secret: order.code_secret,
          kind: 'coupon',
          created_at: order.created_at,
          price_of_product: order.price_of_product,
          sent: order.sent,
          tracking_code: order.tracking_code,
          relationships: {
            product: {
              id: order.product?.code_product,
              type: 'products',
            },
          },
        };
      });
      return { data, included };
    }
    return {};
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne(id, { relations: ['product'] });
  }

  async findTracking(tracking: string) {
    try {
      const eventos = await rastrearEncomendas([tracking]);
      return {
        eventos: eventos[0],
      };
    } catch (error) {
      return {
        message: 'Erro ao rastrear encomenda.',
      };
    }
  }
}
