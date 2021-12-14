import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LogRescues } from 'src/entities/logrescues.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class LogrescueService {
  static transactionLimit = 10;
  static transactionUser = [];
  constructor(

    @Inject('LOGRESCUES_REPOSITORY')
    private logrescuesRepository: Repository<LogRescues>,
  ) {}

  async create(user_id: number, product_code: number, qtd_product_purchased: number, user_rescue_date: Date, qtd_product: number, message: string) {
      
    const objToSave = {
        user_id: user_id,
        created_at: new Date(),
        qtd_product_purchased: qtd_product_purchased,
        user_rescue_date: user_rescue_date,
        product_code: product_code,
        qtd_product: qtd_product,
        message: message,
        reload: false
      }
      console.log(">>>Tentativa de resgate<<<")
      console.log(">>user_id: " + user_id,);
      console.log(">>created_at: " + new Date());
      console.log(">>qtd_product_purchased: " + qtd_product_purchased);
      console.log(">>user_rescue_date: " + user_rescue_date);
      console.log(">>product_code: " + product_code);
      console.log(">>qtd_product: " + qtd_product);
      console.log(">>message: " + message);

      await this.logrescuesRepository.save(objToSave);
  }
}
