import {
  Controller,
  Get,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
  UnauthorizedException,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminRole } from 'src/enums/AdminRoles';

@Controller('v1/backoffice/store/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req, @Query('page') page: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.orderService.findAll(page);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.orderService.findOne(id);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    if (req.user.roles === AdminRole.MASTER)
      return this.orderService.update(id, updateOrderDto);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Put('cancel/:id')
  cancel(@Request() req, @Param('id') id: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.orderService.remove(id);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Put('validate_coupon/:id')
  validate_coupon(@Request() req, @Param('id') id: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.orderService.validate_coupon(id);
    else throw new UnauthorizedException();
  }
}
