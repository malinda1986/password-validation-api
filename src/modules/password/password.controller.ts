import { Controller, Post, Get, Body, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PasswordService } from './password.service';

@ApiTags('passwords')
@Controller('passwords')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('/')
  @HttpCode(204)
  async validatePassword(@Body() body: { password: string }) {
    return this.passwordService.validatePassword(body.password);
  }

  @Get('/')
  async syncDb() {
    return this.passwordService.seedDB();
  }
}
