import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../../../entities/user.entity';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { getRepository, Repository } from 'typeorm';
import { Order } from '../../../../entities/order.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private paginationService: PaginationService,
  ) {}

  async findAll(page = 1) {
    const limit = 20;

    const [result] = await this.orderRepository.query(
      'select count(DISTINCT(user_id)) as count from orders',
    );

    const orders = await this.orderRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'DESC',
      },
      relations: ['product', 'user', 'address'],
    });

    const uniqueUserRelations = [
      ...new Set(orders.map((item) => item.user.id)),
    ];

    const users = [];

    uniqueUserRelations.forEach((user_id) => {
      const order = orders.find((order) => order.user.id === user_id);
      if (!order.user.deleted) {
        users.push(order.user);
      }
    });

    const data = orders.map((order) => {
      return {
        id: order.id,
        type: 'orders',
        created_at: order.created_at,
        price_of_product: order.product.value,
        sent: order.sent,
        tracking_code: order.tracking_code,
        relationships: {
          address: {
            id: order.address.id,
            type: 'addresses',
          },
          product: {
            id: order.product.id,
            type: 'products',
          },
          user: {
            id: order.user.id,
            type: 'users',
          },
        },
      };
    });

    const included = users?.map((user) => {
      return {
        id: user.id,
        type: 'users',
        email: user.email,
        name: user.name,
      };
    });

    return {
      data: data,
      included: included,
      currentPage: page,
      size: Math.ceil(result.count / limit),
      links: this.paginationService.pagination(
        'v1/backoffice/store/orders/users',
        page,
        limit,
        result.count,
      ),
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    return await this.orderRepository.find({
      where: { user: user },
      order: { id: 'DESC' },
    });
  }
}
