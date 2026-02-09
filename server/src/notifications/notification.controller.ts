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
  Param,
  UseGuards,
  Request,
  Query,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NotificationService } from './notification.service';
import { NotificationsQueryDto } from './dto/notifications-query.dto';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getNotifications(
    @Request() req,
    @Query() query: NotificationsQueryDto,
  ) {
    const limitNum = query.limit ?? 50;
    return this.notificationService.getUserNotifications(
      req.user.userId,
      limitNum,
    );
  }

  @Post(':id/read')
  async markAsRead(
    @Param('id', new ParseUUIDPipe({ version: '4' })) notificationId: string,
  ) {
    await this.notificationService.markAsRead(notificationId);
    return { message: 'Notification marked as read' };
  }

  @Post('read-all')
  async markAllAsRead(@Request() req) {
    await this.notificationService.markAllAsRead(req.user.userId);
    return { message: 'All notifications marked as read' };
  }
}
