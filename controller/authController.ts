import { Request, Response } from 'express';
import { AuthService } from '@service/auth/authService';
import { User } from '@model/models';
import { Enums } from '@model/enum';
import 'express-fingerprint';

/**
 * uploadImageController.postAuth
 * @param {} req 
 * @param {*} res 
 */
export const postAuth = async (req: Request, res: Response) => {
  try {
    console.log({ body: req.body });
    let router: string;
    if ('router' in req.body) router = req.body.router;
    else throw Error('no router provided');
    let authService = new AuthService;
    switch (router) {
      case Enums.AuthRouter.emailSendCodeLogIn:
        return res.json(await authService.emailSendCodeLogIn(req.body));
      case Enums.AuthRouter.registration:
        const registrationResult = await authService.registration(req.body) as User;
        console.log({ registrationResult });
        const userHashId = registrationResult.hashId;
        if (req.session.data == undefined) { req.session.data = { [req.sessionID]: { userHashId } }; }
        else { req.session.data[req.sessionID] = { userHashId }; }
        return res.json({ status: 'success' });
      case Enums.AuthRouter.signInEmailPassword: // авторизация по email/pswrd -> user/token
        return res.json(await authService.emailPasswordSignIn(req.body));
      // case Enums.AuthRouter.iForgotGetCodeEmail: // запрос кода на почту, которая есть в бд -> void
      //   return res.json(await authService.iForgotEmailGetCode(req.body));
      // case Enums.AuthRouter.signUpGetCodeEmail: // запрос кода на почту, которой нет в бд -> void
      //   return res.json(await authService.emailGetCodeSignUp(req.body));
      case Enums.AuthRouter.emailSendCode:
        return res.json(await authService.emailSendCode(req.body));
      case Enums.AuthRouter.emailCheckCode: // проверка кода -> bool
      case Enums.AuthRouter.checkCodeEmail: // проверка кода -> bool
        const checkCodeResult = await authService.checkEmailCode(req.body);
        console.log('checkCodeResult', checkCodeResult);
        if (checkCodeResult.userHashId) {
          const userHashId = checkCodeResult.userHashId;
          if (req.session.data == undefined) { req.session.data = { [req.sessionID]: { userHashId } }; }
          else { req.session.data[req.sessionID] = { userHashId }; }
        }
        return res.json(checkCodeResult);
      case Enums.AuthRouter.changePassword: // изменение пароля по почте, которая есть в базе -> bool
        return res.json(await authService.changePassword(req.body));
      case Enums.AuthRouter.setPassword: // задание пароля по почте, которой нет в базе -> bool
        return res.json(await authService.setPassword(req.body));
      case Enums.AuthRouter.setTrustedId:
        return res.json(await authService.setTrustedId({ ...req.body, fingerprint: req.fingerprint?.hash || "" }));
      case Enums.AuthRouter.logInTrustedId:
        const fingerprint: string = req.fingerprint?.hash || "";
        const logInTrustedIdResult: User | undefined = await authService.getUserByTrustedId({ ...req.body, fingerprint });
        if (!logInTrustedIdResult) {
          console.log('no user found');
          return res.json({ error: 'no user found' });
        }
        if (req.session.data == undefined) { req.session.data = { [req.sessionID]: { userHashId: logInTrustedIdResult.hashId } }; }
        else { req.session.data[req.sessionID] = { userHashId: logInTrustedIdResult.hashId }; }
        return res.json({ status: 'success' });
      default:
        throw Error('wrong router');
    }
  } catch (e) {
    console.error(`postAuth error ${e.message}`);
    return res.json({ error: e.message });
  }
};


