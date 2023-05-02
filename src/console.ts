import { PrismaClient } from '@prisma/client';
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require('chalk');
import { PasswordValidationService } from './modules/password/password-validation.service';
const prisma = new PrismaClient();
const log = console.log;

const readPasswords = async () => {
  const passwords = await prisma.passwords.findMany({ where: {} });
  const compromisedPasswords = [];
  const invalidPasswordPromises = passwords.map(async (item) => {
    const passwordValidationService = new PasswordValidationService(
      item.password,
    );
    const passwordApiResponse = await axios.get(
      `http://localhost:5000/compromised?password=${item.password}`,
    );
    if (passwordApiResponse.data) {
      compromisedPasswords.push({
        password: item.password,
        message: passwordApiResponse.data.message,
      });
    }
    let isValid = 1;
    const result = passwordValidationService.run();
    if (result.length > 0) {
      isValid = 0;
    }
    return prisma.passwords.update({
      where: { id: item.id },
      data: {
        valid: isValid,
      },
    });
  });
  //Note : not the optimal way, can write raw query to update this with single db operation
  //password validation and compromisedPasswords handled in the same function, but it can be improved to separate the responsibilities
  const promiseResult = await Promise.all([...invalidPasswordPromises]);
  log('Updated records', promiseResult.length);
  log('Compromised records', compromisedPasswords);
};

readPasswords();
