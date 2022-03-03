import { EmailPassword } from '@service/auth/emailPassword/emailPassword';
import { User } from '@model/models';
import { JwtService } from '@service/jwt/jwtService';
import { EmailPasswordAuthInput, EmailPasswordAuthOutput, EmailSendCodeInput, RegistrationInput, SetTrustedIdInput } from '@service/auth/types/authTypes';
import { UserService } from '@service/user/userService';
import { EmailCode } from './emailCode/emailCode';
import { RegistrationService } from '@service/auth/registration/registrationService';
import { CheckEmailCodeInput } from '@service/auth/types/authTypes';
import { LogInTrustedIdInput } from '@service/auth/types/authTypes';
import { IForgotInput } from '@service/auth/types/authTypes';
import { EmailSignUpInput } from '@service/auth/types/authTypes';
import { ChangePasswordInput } from '@service/auth/types/authTypes';
import { SetPasswordInput } from '@service/auth/types/authTypes';
import { CheckEmailCodeOutput } from '@service/auth/types/authTypes';
import { UserDao } from '@dao/userDao';
import { TrustedId } from '@service/auth/trustedId/trustedId';

export class AuthService {
  private readonly emailPassword: EmailPassword;
  private readonly userService: UserService;
  private readonly jwtService: JwtService;
  private readonly emailCode: EmailCode;
  private readonly registrationService: RegistrationService;
  private readonly userDao: UserDao;

  constructor() {
    this.userDao = new UserDao();
    this.userService = new UserService();
    this.emailPassword = new EmailPassword();
    this.jwtService = new JwtService();
    this.emailCode = new EmailCode();
    this.registrationService = new RegistrationService();
  }

  async emailPasswordSignIn(body: EmailPasswordAuthInput): Promise<EmailPasswordAuthOutput> {
    try {
      let userFromToken: User = body.user;
      let userByEmailPassword: User = await this.emailPassword.emailPasswordSignIn(body);
      let token: string = await this.jwtService.createToken(userByEmailPassword.hashId);
      if (userFromToken.deviceId === 'none') throw Error('lost deviceId');
      await this.userService.setUniqueDeviceData(userFromToken.deviceId, userByEmailPassword.hashId);
      return { User: userByEmailPassword, Token: token };
    } catch (e) {
      console.error(`emailPasswordAuth ${e.message}`);
      throw Error(e.message);
    }
  }

  async registration(body: RegistrationInput) {
    return await this.registrationService.registration(body);
  }

  // async iForgotEmailGetCode(body: IForgotInput) {
  //   try {
  //     let checkEmailResult = await this.userService.checkIsEmailExist(body.email);
  //     if (checkEmailResult) {
  //       return await this.emailCode.emailSendCode(body);
  //     } else {
  //       throw Error('no user found');
  //     }
  //   } catch (e) {
  //     console.error(`methodName ${e.message}`);
  //     throw Error(e.message);
  //   }
  // }

  async checkEmailCode(body: CheckEmailCodeInput): Promise<CheckEmailCodeOutput> {
    const isCodeCorrect = await this.emailCode.emailCheckCode(body);
    const registeredUserByEmailFilter: string = `email = "${body.email}"`;
    const registeredUserByEmail: User | undefined = (await this.userDao.getByFilter(registeredUserByEmailFilter))[0];
    if (registeredUserByEmail && body.isUniqueDevice) {
      await this.userService.setUniqueDeviceData(body.user.deviceId, registeredUserByEmail.hashId);
    }
    return { isCodeCorrect, isRegistered: registeredUserByEmail != undefined, userHashId: registeredUserByEmail?.hashId };
  }

  // async emailGetCodeSignUp(body: EmailSignUpInput) {
  //   try {
  //     console.log('emailSignUp GO!');
  //     let checkEmailResult = await this.userService.checkIsEmailExist(body.email);
  //     if (checkEmailResult) throw Error('email already exists');
  //     else return await this.emailCode.emailSendCode(body);
  //   } catch (e) {
  //     console.error(`emailSignIn ${e.message}`);
  //     throw Error(e.message);
  //   }
  // }

  async emailSendCodeLogIn(body: EmailSendCodeInput) {
    try {
      const email: string = body.email;
      const isEmailExist: boolean = await this.userService.checkIsEmailExist(email);
      if (isEmailExist) { return await this.emailCode.emailSendCode(body); }
      else { throw Error(`no user found by email ${email}`); }
    } catch (e) {
      console.log("emailSendCodeLogIn", e.message);
      throw Error(e.message);
    }
  }

  async emailSendCode(body: EmailSendCodeInput) {
    try {
      return await this.emailCode.emailSendCode(body);
    } catch (e) {
      console.log("emailGetCode", e.message);
      throw Error(e.message);
    }
  }

  async changePassword(body: ChangePasswordInput) {
    try {
      return await this.emailPassword.changePassword(body);
    } catch (e) {
      console.error(`changePassword ${e.message}`);
      throw Error(e.message);
    }
  }

  async setTrustedId(input: SetTrustedIdInput) {
    try {
      // такой fingerprint уже есть у юзера, по дефолту false
      let includesFingerprint: boolean = Boolean();
      const userHashId: string = input.user.hashId;
      const trustedId: string = input.trustedId;
      const fingerprint: string = input.fingerprint;
      const trustedIdWithFingerPrint: string = `${trustedId}_${fingerprint}`;
      let currTrustedIdList: string[] = Array.from(input.user.trustedIdList);
      for (let i in currTrustedIdList) {
        const currTrustedId: string = currTrustedIdList[i];
        if (currTrustedId.includes(fingerprint)) {
          currTrustedIdList[i] = trustedIdWithFingerPrint;
          includesFingerprint = true;
          break;
        }
      }
      const newTrustedIdList: string[] = includesFingerprint ? currTrustedIdList : [...currTrustedIdList, trustedIdWithFingerPrint];
      await this.userDao.update(userHashId, { trustedIdList: newTrustedIdList });
      return { status: 'success' };
    } catch (e) {
      console.log("setTrustedId", e.message);
      throw Error(e.message);
    }
  }

  async getUserByTrustedId(input: LogInTrustedIdInput): Promise<User | undefined> {
    const trustedId = input.trustedId;
    const fingerprint = input.fingerprint;
    // происходит вход из-под одного и того же пароля с разных девайсов
    const user = await this.userDao.getByFilter(`any trustedIdList CONTAINS "${trustedId}"`);
    return user[0];
  }

  async setPassword(body: SetPasswordInput) {
    try {
      return await this.emailPassword.setPassword(body);
    } catch (e) {
      console.error(`changePassword ${e.message}`);
      throw Error(e.message);
    }
  }
}