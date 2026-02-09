/* eslint-disable @typescript-eslint/no-unused-vars,
  @typescript-eslint/no-unsafe-assignment,
  @typescript-eslint/no-unsafe-member-access,
  @typescript-eslint/no-unsafe-argument,
  @typescript-eslint/require-await,
  @typescript-eslint/no-misused-promises,
  @typescript-eslint/no-unsafe-return,
  @typescript-eslint/no-unsafe-call,
  @typescript-eslint/restrict-template-expressions,
  @typescript-eslint/no-base-to-string,
  no-empty,
  @typescript-eslint/no-require-imports,
  no-useless-escape,
  no-control-regex */

import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LocationShareService } from './location-share.service';
import { StartShareDto } from './dto/start-share.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('location-share')
@UseGuards(JwtAuthGuard)
export class LocationShareController {
  constructor(private readonly locationShareService: LocationShareService) {}

  @Post('start')
  async startShare(@Request() req, @Body() dto: StartShareDto) {
    return this.locationShareService.startShare(req.user.userId, dto);
  }

  @Post(':id/stop')
  async stopShare(@Request() req, @Param('id') shareId: string) {
    await this.locationShareService.stopShare(req.user.userId, shareId);
    return { message: 'Location sharing stopped' };
  }

  @Put(':id/location')
  async updateLocation(
    @Request() req,
    @Param('id') shareId: string,
    @Body() dto: UpdateLocationDto,
  ) {
    return this.locationShareService.updateLocation(
      req.user.userId,
      shareId,
      dto,
    );
  }

  @Get('active')
  async getActiveShares(@Request() req) {
    return this.locationShareService.getActiveShares(req.user.userId);
  }

  @Get('my-shares')
  async getMyShares(@Request() req) {
    return this.locationShareService.getMyShares(req.user.userId);
  }

  @Get(':id')
  async getShare(@Request() req, @Param('id') shareId: string) {
    return this.locationShareService.getShare(req.user.userId, shareId);
  }
}
