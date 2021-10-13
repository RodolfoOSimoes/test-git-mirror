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
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AdminRole } from 'src/enums/AdminRoles';
import { AddressService } from './address.service';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('v1/backoffice/store/orders/addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER, AdminRole.PROMOTER, AdminRole.ADMIN)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    return this.addressService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AdminRole.MASTER)
  @Put(':id')
  update(
    @Request() req,
    @Param('id') id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(id, updateAddressDto);
  }
}
