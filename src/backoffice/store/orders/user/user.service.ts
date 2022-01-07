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

  async findAll(page = 1, query = '') {
    const limit = 20;

    const [result] = await this.orderRepository.query(
      `SELECT COUNT(DISTINCT(orders.user_id)) AS count FROM orders 
       LEFT OUTER JOIN products
        ON products.id = orders.product_id AND products.deleted = FALSE 
       LEFT OUTER JOIN users 
        ON users.id = orders.user_id
       LEFT OUTER JOIN addresses 
        ON addresses.user_id = users.id AND addresses.deleted = FALSE AND addresses.order_id IS NULL
        WHERE users.email LIKE '%${query}%' OR addresses.cep LIKE '%${query}%' OR
        users.name LIKE '%${query}%' OR products.name LIKE '%${query}%'
      `,
    );

    const offset = (page - 1) * limit;

    var sqlOrders = `SELECT MAX(orders.id) AS order_id, users.id AS id, users.email AS email, users.name AS name FROM orders 
    LEFT OUTER JOIN products
     ON products.id = orders.product_id AND products.deleted = FALSE 
    LEFT OUTER JOIN users 
     ON users.id = orders.user_id AND users.deleted = FALSE 
    LEFT OUTER JOIN addresses 
     ON addresses.user_id = users.id AND addresses.deleted = FALSE AND addresses.order_id IS NULL
     WHERE users.email LIKE ? OR addresses.cep LIKE ? OR
     users.name LIKE ? OR products.name LIKE ?
    GROUP BY orders.user_id ORDER BY order_id DESC LIMIT ? OFFSET ?`;
    const orders = await this.orderRepository.query(sqlOrders,
      [query, query, query, query, limit, offset],
    );

    return {
      data: orders,
      currentPage: page,
      size: Math.ceil(result.count / limit),
      links: this.paginationService.pagination(
        'v1/backoffice/store/orders/users/list',
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
      relations: ['product'],
    });
  }
}
