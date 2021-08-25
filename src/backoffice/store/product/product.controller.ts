import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminRole } from 'src/enums/AdminRoles';

@Controller('v1/backoffice/store/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createProductDto: CreateProductDto) {
    if (req.user.roles === AdminRole.MASTER)
      return this.productService.create(req.user.id, createProductDto);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req, @Query('page') page: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.productService.findAll(page);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.productService.findOne(id);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    if (req.user.roles === AdminRole.MASTER)
      return this.productService.update(req.user.id, id, updateProductDto);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.productService.remove(id);
    else throw new UnauthorizedException();
  }
}
