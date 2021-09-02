import { Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/backoffice/user/user.service';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '../../../entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private orderRepository: Repository<Order>,
    private userService: UserService,
    private productService: ProductService,
  ) {}

  async validate_coupon(coupon_id: number) {
    const order = await this.orderRepository.findOne({
      tracking_code: coupon_id.toString(),
    });
    return order
      ? { message: 'Cupom válido.' }
      : { message: 'Cupom inválido.' };
  }

  async findAll(page = 1) {
    const limit = 10;
    return await this.orderRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      order: {
        id: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const data = await this.orderRepository.findOne(id, {
      relations: [
        'user',
        'product',
        'address',
        'address.city',
        'address.city.state',
      ],
    });
    //TODO: mapear itens utilizados
    return data;
  }

  async update(id: number, dto: UpdateOrderDto) {
    const product = await this.productService.findOne(dto.order.product_id);
    const user = await this.userService.findOne(dto.order.user_id);
    await this.orderRepository.update(id, {
      ...dto.order,
      user: user,
      product: product,
    });
    return { message: 'Ordem atualizada com sucesso.' };
  }

  async remove(id: number) {
    // await this.orderRepository.update(id, {
    //   deleted: true,
    // });

    return { message: 'Ordem deletado com sucesso.' };
  }
}
