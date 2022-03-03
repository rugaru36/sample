import { User } from '@model/models';

export type SetUserBrowserId = {
  user: User;
  browserId: string;
};

export type GetUserByBrowserId = {
  user: User;
  browserId: string;
};

export type EmailSendCodeInput = {
  email: string;
  langCode: string;
};

export type EmailCheckCodeInput = {
  email: string;
  code: string;
  user: User;
};

export type PhonePasswordAuthInput = {
  phone: string,
  password: string;
};

export type PhonePasswordAuthOutput = {
  Token: string;
  User: User;
};

export type EmailPasswordAuthInput = {
  email: string;
  password: string;
  user: User;
};

export type CheckEmailPasswordReqBody = {
  email: string;
  password: string;
};

export type CheckEmailInput = {
  email: string;
};

export type EmailPasswordAuthOutput = {
  Token: string;
  User: User;
};

export type IForgotInput = {
  email: string;
};

export type EmailSignUpInput = {
  email: string;
};

export type CheckEmailCodeInput = {
  email: string;
  code: string;
  user: User;
  // isFromWeb?: boolean;
  isUniqueDevice?: boolean;
};

export type CheckEmailCodeOutput = {
  // result: boolean
  userHashId?: string;
  isCodeCorrect: boolean;
  isRegistered: boolean;
};

export type ChangePasswordInput = {
  password: string;
  email: string;
};

export type SetTrustedIdInput = {
  trustedId: string;
  fingerprint: string;
  user: User;
};

export type LogInTrustedIdInput = {
  trustedId: string;
  fingerprint: string;
  user: User;
};

export type SetPasswordInput = {
  password: string;
  email: string;
};

export type RegistrationInput = {
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  user: User;
  language: string;
};
