import {
  Controller,
  Get,
  Request,
  Body,
  Param,
  UseGuards,
  UnauthorizedException,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminRole } from 'src/enums/AdminRoles';
import { AddressService } from './address.service';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('v1/backoffice/store/orders/addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.addressService.findOne(id);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    if (req.user.roles === AdminRole.MASTER)
      return this.addressService.update(id, updateAddressDto);
    else throw new UnauthorizedException();
  }
}
