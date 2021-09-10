import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminRole } from 'src/enums/AdminRoles';
import { StatementService } from './statement.service';

@Controller('v1/backoffice/statements')
export class StatementController {
  constructor(private readonly statementService: StatementService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Request() req,
    @Query('user_id') user_id: number,
    @Query('page') page: number,
  ) {
    if (req.user.roles === AdminRole.MASTER)
      return this.statementService.findAll(user_id, page);
    else throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') id: number) {
    if (req.user.roles === AdminRole.MASTER)
      return this.statementService.findOne(id);
    else throw new UnauthorizedException();
  }
}
