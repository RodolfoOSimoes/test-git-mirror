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
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('v1/backoffice/store/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER, AdminRole.PROMOTER, AdminRole.ADMIN)
  @Get()
  findAll(@Request() req, @Query('page') page: number) {
    return this.orderService.findAll(page);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER, AdminRole.PROMOTER, AdminRole.ADMIN)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    return this.orderService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Put('cancel/:id')
  cancel(@Request() req, @Param('id') id: number) {
    return this.orderService.remove(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Put('validate_coupon/:id')
  validate_coupon(@Request() req, @Param('id') id: number) {
    return this.orderService.validate_coupon(id);
  }
}
