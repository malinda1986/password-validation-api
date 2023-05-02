import { Injectable } from '@nestjs/common';

const defaultRule = [
  {
    rule: new RegExp(/^.{5,}$/),
    matcher: 'regex',
    message: 'Password should contain minimum five characters',
  },
  {
    rule: new RegExp(/.*[0-9].*/),
    matcher: 'regex',
    message: 'Password should contain at least one digit',
  },
  {
    rule: new RegExp(/^(?!.*(\S)\1{2})[a-zA-Z0-9 ]*$/),
    matcher: 'regex',
    message:
      'Password cannot contain more than two repeating consecutive characters',
  },
  {
    rule: new RegExp(/^(?=.*[A-Z!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/),
    matcher: 'regex',
    message:
      'Password should contain at least one upper-case character OR one special character',
  },
];
@Injectable()
export class PasswordValidationService {
  private _rules;
  private _password;
  constructor(password: string, rules?: Record<any, any>) {
    if (rules) {
      this._rules = { ...defaultRule, ...rules };
    } else {
      this._rules = defaultRule;
    }
    this._password = password;
  }

  validatePipeLine() {
    const errors = [];
    this._rules.forEach((item: Record<any, any>) => {
      const { rule, matcher, message } = item;
      if (matcher === 'regex') {
        const valid = rule.test(this._password);
        if (!valid) {
          errors.push(message);
        }
      }
    });
    return errors;
  }

  run(): string[] {
    return this.validatePipeLine();
  }
}
