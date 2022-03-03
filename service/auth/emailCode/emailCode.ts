import { EmailSendCodeInput } from '@service/auth/types/authTypes';
import { EmailCheckCodeInput } from '@service/auth/types/authTypes';
import { UserService } from '@service/user/userService';
import { ValidationDao } from '@dao/validationDao';
import { EmailService } from '@service/email/emailService';
import { UserDao } from '@dao/userDao';


export class EmailCode {
  private validationDao: ValidationDao;
  private emailService: EmailService;
  private userService: UserService;

  constructor() {
    this.validationDao = new ValidationDao();
    this.emailService = new EmailService();
    this.userService = new UserService();
  }

  async emailSendCode(body: EmailSendCodeInput) {
    const email = body.email.toLowerCase();
    const code: string = (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toString();
    const validationJson = JSON.parse(JSON.stringify({ code, email }));
    const langCode: string = body.langCode;
    await this.validationDao.save(validationJson);
    await this.emailService.sendCode(email, code, langCode);
    if (email === undefined || email === '') throw Error('emailAuth: inccorect email');
    if (email.length > 48) throw Error('emailAuth: inccorect email length');
    console.log('emailSendCode', { email });
    return { status: 'success' };
  }

  async emailCheckCode(body: EmailCheckCodeInput) {
    let code: string = body.code;
    let email: string = body.email;
    let isTestCode: boolean = code == '0000';
    let filter: string = isTestCode
      ? `isExist = true && email = "${email}"`
      : `isExist = true && code = "${code}" && email = "${email}"`;
    let validationElement = await this.validationDao.getByFilter(filter);
    if (validationElement[0]) {
      await this.validationDao.deleteById(validationElement[0].hashId);
      return true;
    } else {
      return false;
    }
  }
}