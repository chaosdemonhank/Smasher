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

import { IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateSignedUploadDto {
  @IsString()
  @IsNotEmpty()
  // e.g., users/{userId}/images/{uuid}.jpg or videos/{uuid}.mp4
  // Avoid path traversal
  @Matches(/^(?!\.\.|\/)([\w\-\/\.])+$/)
  key!: string;

  @IsString()
  @IsNotEmpty()
  // Basic safeguard for content types
  @Matches(/^(image\/(jpeg|png|webp|gif)|video\/(mp4|webm))$/)
  contentType!: string;
}

export class CreateSignedDownloadDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?!\.\.|\/)([\w\-\/\.])+$/)
  key!: string;
}
