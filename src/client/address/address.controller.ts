import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Res,
  Param,
  Request,
  UseGuards,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Response } from 'express';

@Controller('v1/app/users/addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Request() req,
    @Body() createAddressDto: CreateAddressDto,
    @Res() res: Response,
  ) {
    if (req.user.roles == 'spotify') {
      const errors = this.validationAddress(createAddressDto);
      if (errors.hasError) {
        delete errors.hasError;
        return res.status(403).send(errors);
      }
      const result = await this.addressService.create(
        req.user.id,
        createAddressDto,
      );
      return res.status(200).send(result);
    }
    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  find(@Request() req) {
    if (req.user.roles == 'spotify') {
      return this.addressService.findOne(req.user.id);
    }
    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async update(
    @Request() req,
    @Body() updateAddressDto: UpdateAddressDto,
    @Res() res: Response,
  ) {
    const errors = this.validationAddress(updateAddressDto);
    if (req.user.roles == 'spotify') {
      if (errors.hasError) {
        delete errors.hasError;
        return res.status(403).send(errors);
      }
      const result = await this.addressService.update(
        req.user.id,
        updateAddressDto,
      );
      return res.status(200).send(result);
    }
    throw new UnauthorizedException();
  }

  validationAddress(dto) {
    const { address } = dto;

    const errors = {
      hasError: false,
    };

    if (!address.recipient) {
      errors.hasError = true;
      Object.assign(errors, { recipient: ['Não pode ficar em branco'] });
    }

    if (!address.cpf) {
      errors.hasError = true;
      Object.assign(errors, { cpf: ['Não pode ficar em branco'] });
    }

    if (
      address.cpf &&
      !/^(\d{3}.\d{3}.\d{3}-\d{2})|(\d{11})$ ou ^\d{3}\x2E\d{3}\x2E\d{3}\x2D\d{2}$/.test(
        address.cpf,
      )
    ) {
      errors.hasError = true;
      Object.assign(errors, { cpf: ['CPF inválido'] });
    }

    if (!address.cep) {
      errors.hasError = true;
      Object.assign(errors, { cep: ['Não pode ficar em branco'] });
    }

    if (address.cep && !/^\d{5}-\d{3}$/.test(address.cep)) {
      errors.hasError = true;
      Object.assign(errors, { cep: ['CEP inválido'] });
    }

    if (!address.street) {
      errors.hasError = true;
      Object.assign(errors, { street: ['Não pode ficar em branco'] });
    }

    if (!address.number) {
      errors.hasError = true;
      Object.assign(errors, { number: ['Não pode ficar em branco'] });
    }

    if (!address.neighborhood) {
      errors.hasError = true;
      Object.assign(errors, { neighborhood: ['Não pode ficar em branco'] });
    }

    if (!address.city_id) {
      errors.hasError = true;
      Object.assign(errors, { city_id: ['Não pode ficar em branco'] });
    }
    return errors;
  }
}
