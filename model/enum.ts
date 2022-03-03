export module Enums {
  export enum EmailTypes {
    oneTimeCode = 'oneTimeCode',
    greetingsAfterRegistration = 'greetingsAfterRegistration',
    guestNewDocumentOneSide = 'guestNewDocumentOneSide',
    guestNewDocumentTwoSides = 'guestNewDocumentTwoSides',
    guestRemind = 'guestRemind',
    twoSidesDocumentSigned = 'twoSidesDocumentSigned',
    documentArchived = 'documentArchived',
    // actionNotification = 'actionNotification',
    eventEmailOpened = 'eventEmailOpened',
    eventDocumentViewed = 'eventDocumentViewed',
    // eventDocumentSigned = 'eventDocumentSigned',
  }

  export enum DocumentPermissionRoles {
    host = 'host',
    guest = 'guest',
    unknown = 'unknown'
  }

  export enum DocumentSignNotificationFriquency {
    everyDay = 'everyDay',
    everyTwoDays = 'everyTwoDays',
    everyThreeDays = 'everyThreeDays',
    everyWeek = 'everyWeek',
    never = 'never'
  }

  export enum DocumentEventTypes {
    createdAndSent = 'createdAndSent',
    emailIsRead = 'emailIsRead',
    archived = 'archived',
    opened = 'opened',
    signed = 'signed',
  }

  export enum DocumentArchivingTerm {
    threeDays = 'threeDays',
    week = 'week',
    twoWeeks = 'twoWeeks',
    month = 'month'
  }

  export enum DocumentTypes {
    oneSide = 'oneSide',
    twoSides = 'twoSides'
  }

  export enum DocumentStates {
    uploaded = 'uploaded',
    waitingForSign = 'waitingForSign',
    signed = 'signed',
    archived = 'archived',
    viewed = 'viewed'
  }

  export enum AutoLoginTypes {
    webauthn = 'webauthn',
    passwordCredential = 'passwordCredential',
    cookieStorage = 'cookieStorage'
  }

  export enum Roles {
    root,
    user,
  }

  export enum Documents {
    terms,
    policy,
    faq,
  }

  export enum QuestionTypes {
    bool = 'bool',
    string = 'string'
  }

  export enum DatabaseCollection {
    User = 'User',
    Image = 'Image',
    Pdf = 'Pdf',
    Validation = 'Validation',
    Document = 'Document',
    DocumentEvent = 'DocumentEvent',
  }

  export enum DatabaseRouter {
    fetch = 'fetch',
    update = 'update',
    delete = 'delete',
    recover = 'recover'
  }

  export enum AuthRouter {
    emailSendCodeLogIn = 'emailSendCodeLogIn',
    registration = 'registration',
    signInEmailPassword = 'signInEmailPassword',
    iForgotGetCodeEmail = 'iForgotGetCodeEmail',
    signUpGetCodeEmail = 'signUpGetCodeEmail',
    emailSendCode = 'emailSendCode',
    emailCheckCode = 'emailCheckCode',
    checkCodeEmail = 'checkCodeEmail',
    changePassword = 'changePassword',
    setPassword = 'setPassword',
    setTrustedId = 'setTrustedId',
    logInTrustedId = 'logInTrustedId'
  }

  export enum ApiRouter {
    updateSignatureSize = 'updateSignatureSize',
    updateStampSize = 'updateStampSize',
    hostSignOneSideDocument = 'hostSignOneSideDocument',
    hostSignTwoSidesDocument = 'hostSignTwoSidesDocument',
    guestSignTwoSidesDocument = 'guestSignTwoSidesDocument',
    mainLoad = 'mainLoad',
    getEmailText = 'getEmailText'
  }
}