import { Res } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UnauthorizedException,
  Query,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { QuestService } from './quest.service';

@Controller('v1/app/quests')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    if (req.user.roles == 'spotify')
      return this.questService.findAll(req.user.id);
    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async update(
    @Request() req,
    @Res() res,
    @Query('id') id: number,
    @Body() body,
  ) {
    if (req.user.roles == 'spotify') {
      const result = await this.questService.update(req.user.id, id, body);
      if (result.hasError)
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: result.message,
          answer: result.answer,
        });
      return res.status(HttpStatus.CREATED).json('ok');
    }
    throw new UnauthorizedException();
  }
}
