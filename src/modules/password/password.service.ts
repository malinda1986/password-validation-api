import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { readFile } from 'fs/promises';
import { PrismaService } from '../../shared/prisma.service';
import { PasswordValidationService } from './password-validation.service';

@Injectable()
export class PasswordService {
  constructor(
    private _prisma: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async seedDB() {
    this.logger.info('Seeding DB...');
    const sql = await (
      await readFile(`${process.cwd()}/db/backup/files/sqldump.sql`)
    ).toString();
    this.logger.info('Seeding completed...');

    return await this._prisma.$queryRawUnsafe(sql);
  }
  async validatePassword(password: string) {
    this.logger.info('Password validation request received');

    const passwordValidationService = new PasswordValidationService(password);
    const response = passwordValidationService.run();
    if (response.length > 0) {
      throw new HttpException({ errors: response }, HttpStatus.BAD_REQUEST);
    }
    return null;
  }
}
