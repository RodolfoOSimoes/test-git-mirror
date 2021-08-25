import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('v1/app/users/addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createAddressDto: CreateAddressDto) {
    if (req.user.roles == 'spotify')
      return this.addressService.create(req.user.id, createAddressDto);
    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  find(@Request() req) {
    if (req.user.roles == 'spotify')
      return this.addressService.findOne(req.user.id);
    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Request() req, @Body() updateAddressDto: UpdateAddressDto) {
    if (req.user.roles == 'spotify')
      return this.addressService.update(req.user.id, updateAddressDto);
    throw new UnauthorizedException();
  }
}
