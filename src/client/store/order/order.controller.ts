import { Query } from '@nestjs/common';
import {
  Controller,
  Get,
  Request,
  Param,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OrderService } from './order.service';

@Controller('v1/app/store/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  findKind(@Request() req, @Query('kind') kind: string) {
    if (req.user.roles == 'spotify')
      return this.orderService.findKind(req.user.id, kind);
    throw new UnauthorizedException();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    if (req.user.roles == 'spotify') return this.orderService.findOne(id);
    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get('tracking/:tracking_id')
  findTracking(@Request() req, @Param('tracking_id') tracking_id: string) {
    if (req.user.roles == 'spotify')
      return this.orderService.findTracking(tracking_id);
    throw new UnauthorizedException();
  }
}
