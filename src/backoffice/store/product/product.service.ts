import { Inject, Injectable } from '@nestjs/common';
import { AdminService } from 'src/backoffice/admin/admin.service';
import { BadgeChallengeService } from 'src/backoffice/badge-challenge/badge-challenge.service';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../../../entities/product.entity';
import { generateCode } from 'src/utils/code.utils';
import { StorageService } from 'src/utils/storage/storage.service';
import { getBrlUtcDate, getDate } from 'src/utils/date.utils';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    private adminService: AdminService,
    private badgeChallengeService: BadgeChallengeService,
    private paginationService: PaginationService,
    private storageService: StorageService,
  ) {}

  async create(admin_id: number, dto: CreateProductDto) {
    const admin = await this.adminService.findById(admin_id);
    const { product } = dto;

    const newProduct = await this.productRepository.save({
      admin: admin,
      code_product: generateCode(11),
      name: product.name,
      value: product.value,
      date_start: getDate(product.date_start),
      date_finish: getDate(product.date_finish),
      status: product.status,
      deleted: false,
      quantity: product.quantity,
      quantities_purchased: 0,
      lock_version: 1,
      created_at: new Date(),
      updated_at: new Date(),
      kind: product.kind,
      description: product.description,
    });
    if (product.image && product.image.data) {
      await this.storageService.createPic(
        product.image.data,
        newProduct.id,
        'Product',
      );
    }

    return { message: 'Produto criado com sucesso.' };
  }

  async findAll(page = 1) {
    const limit = 10;
    const count = await this.productRepository.count({
      where: { deleted: false },
    });

    const data = (
      await this.productRepository.find({
        skip: (page - 1) * limit,
        take: limit,
        order: {
          id: 'DESC',
        },
        where: {
          deleted: false,
        },
      })
    )?.map((product) => this.productMapper(product));

    return {
      data,
      currentPage: page,
      size: Math.ceil(count / limit),
      links: this.paginationService.pagination(
        'v1/backoffice/store/products',
        page,
        limit,
        count,
      ),
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id);

    return this.productMapper(product);
  }

  async update(admin_id: number, id: number, dto: UpdateProductDto) {
    const admin = await this.adminService.findById(admin_id);
    // const badge = await this.badgeChallengeService.findOne(
    //   dto.product.badge_challenge_id,
    // );

    const { product } = dto;

    await this.productRepository.update(id, {
      admin: admin,
      name: product.name,
      value: product.value,
      date_start: getDate(product.date_start),
      date_finish: getDate(product.date_finish),
      status: product.status,
      quantity: product.quantity,
      updated_at: new Date(),
      kind: product.kind,
      description: product.description,
    });
    if (product.image && product.image.data) {
      await this.storageService.updatePic(product.image.data, id, 'Product');
    }

    return { message: 'Produto atualizado com sucesso.' };
  }

  async remove(id: number) {
    await this.productRepository.update(id, {
      deleted: true,
    });

    return { message: 'Produto deletado com sucesso.' };
  }

  productMapper(product: Product) {
    if (!product) return undefined;
    return {
      id: product.id,
      name: product.name,
      value: product.value,
      quantity: product.quantity,
      date_start: getBrlUtcDate(product.date_start),
      date_finish: getBrlUtcDate(product.date_finish),
      description: product.description,
      status: product.status,
      kind: product.kind == 0 ? 'delivery' : 'coupon',
    };
  }
}
