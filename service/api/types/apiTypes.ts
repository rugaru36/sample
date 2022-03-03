import { User, Image } from '@model/models';

export type SignTranslateEmailInput = {
  user: User;
  guestUserName: string;
  // hostUserName;
  // hostUserName;
  guestUserLang: string;
  documentType: string;
  documentName: string;
};

export type PageCommandData = {
  [page: number]: {
    command: string;
  };
};

export type MainloadInput = {
  user: User;
};

export type GuestOpenDocumentInput = {
  deviceData: string;
  user: User;
  documentHashId: string;
  ip: string | undefined;
};

export type GuestOpenEmailInput = {
  deviceData: string;
  documentHashId: string;
  ip: string | undefined;
};

export type HostSignTwoSidesDocumentDataInput = {
  user: User;
  deviceData: string;
  documentHashId: string;
  imageHashIdList: string[];
  guestSignatureLocationDataList: SignatureLocationData[];
  hostSignatureLocationDataList: SignatureLocationData[];
  guestUserEmail: string;
  documentName: string;
  notificationFrequencyAsString: string;
  archiveTimeAsString: string;
  messageText: string;
  guestLanguage: string;
  ip: string | undefined;
  toDrawStamp: boolean;
};

export type SignatureLocationData = {
  pageNum: number;
  perсCoordinates: number[];
};

export type GuestSignDocumentInput = {
  documentHashId: string;
  user: User;
  deviceData: string;
  ip: string | undefined;
  toDrawStamp: boolean;
};

export type HostSignDocumentInput = {
  documentHashId: string;
  deviceData: string;
  guestUserEmail: string;
  hostSignatureLocationDataList: SignatureLocationData[];
  messageText: string;
  user: User;
  documentName: string;
  guestLanguage: string;
  ip: string | undefined;
  toDrawStamp: boolean;
};

export type CreateAnswerInput = {
  questionHashId: string,
  boolAnswer?: string,
  stringAnswer?: string,
  user: User;
};

export type CreateQuestionInput = {
  enumType: string,
  textRu: string,
  optionsRu: string[],
  textEn: string,
  optionsEn: string[],
  textEs: string,
  optionsEs: string[],
  textPol: string,
  optionsPol: string[],
  textPt: string,
  optionsPt: string[],
  imageHashId: string,
};

export type SendFeedbackInput = {
  message: string;
  user: User;
};