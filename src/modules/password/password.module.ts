import { Module } from '@nestjs/common';
import { PasswordController } from './password.controller';
import { PrismaService } from '../../shared/prisma.service';
import { PasswordService } from './password.service';

@Module({
  providers: [PasswordService, PrismaService],
  controllers: [PasswordController],
  exports: [PasswordService],
  imports: [],
})
export class PasswordModule {}
