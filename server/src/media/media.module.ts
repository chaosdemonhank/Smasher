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

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Media } from './media.entity';
import { User } from '../users/user.entity';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';

@Module({
  imports: [TypeOrmModule.forFeature([Media, User]), PassportModule],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
