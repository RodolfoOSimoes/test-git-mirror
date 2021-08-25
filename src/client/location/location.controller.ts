import {
  Controller,
  Get,
  Param,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocationService } from './location.service';

@Controller('v1/app/locations/')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
  @UseGuards(JwtAuthGuard)
  @Get('states')
  findAll(@Request() req) {
    if (req.user.roles == 'spotify') return this.locationService.findStates();
    throw new UnauthorizedException();
  }
  @UseGuards(JwtAuthGuard)
  @Get('state/:state_id/cities')
  findOne(@Request() req, @Param('state_id') state_id: number) {
    if (req.user.roles == 'spotify')
      return this.locationService.findCities(state_id);
    throw new UnauthorizedException();
  }
}
