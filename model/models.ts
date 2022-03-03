// import { Enums } from '@model/enum'
import Realm from 'realm';
import { v4 as uuidv4 } from 'uuid';
import { unlinkSync, existsSync } from 'fs';

export class User {
  public static schema: Realm.ObjectSchema = {
    name: 'User',
    primaryKey: 'hashId',
    properties: {
      deviceId: 'string',
      trustedIdList: { type: 'string[]', optional: false },
      // touchCredentials: { type: 'data[]', optional: false },
      roles: "string[]",
      name: "string",
      firstName: { type: 'string', optional: false },
      lastName: { type: 'string', optional: false },
      middleName: { type: 'string', optional: false },
      signature: { type: 'Image', optional: false },
      signatureSize: { type: 'int', optional: false },
      stamp: { type: 'Image', optional: false },
      stampSize: { type: 'int', optional: false },
      phone: "string",
      email: "string",
      password: "string",
      incomingDocumentList: { type: 'Document[]', optional: false },
      outgoingDocumentList: { type: 'Document[]', optional: false },
      documentEventList: { type: 'DocumentEvent[]', optional: false },
      signedDocumentsCount: { type: 'int', optional: false },
      language: { type: 'string', optional: false },
      availableDocsCount: { type: 'int', optional: false },
      billingPlan: { type: 'BillingPlan', optional: false },
      applyBillingPlayDayOfMonth: { type: 'int', optional: false },

      hashId: 'string',
      isExist: 'bool',
      updated: 'int',
      created: 'int',
    }
  };

  // public touchCredentials: ArrayBuffer[] = [];
  public applyBillingPlayDayOfMonth: number = Number();
  public language: string = "en";
  public signedDocumentsCount: number = Number();
  public trustedIdList: string[] = [];
  public signatureSize: number = Number();
  public stampSize: number = Number();
  public deviceId: string = String();
  public hashId: string = uuidv4();
  public isExist: boolean = true;
  public updated: number = Date.now() / 1000;
  public created: number = Date.now() / 1000;
  public roles: string[] = [];
  public name: string = String();
  public phone: string = String();
  public email: string = String();
  public password: string = String();
  public firstName: string = String();
  public lastName: string = String();
  public middleName: string = String();
  public signature: Image | null = null;
  public stamp: Image | null = null;
  public incomingDocumentList: Document[] = [];
  public outgoingDocumentList: Document[] = [];
  public documentEventList: DocumentEvent[] = [];
  public availableDocsCount: number = Number();
  public billingPlan: BillingPlan | null = null;

  constructor(json: JSON | { [key: string]: any; }) {
    this.parseData(json);
  }

  parseData(json: { [index: string]: any; }) {
    if (typeof json['stampSize'] === 'number') { this.stampSize = json['stampSize']; }
    if (typeof json['applyBillingPlayDayOfMonth'] === 'number') { this.applyBillingPlayDayOfMonth = json['applyBillingPlayDayOfMonth']; }
    if (typeof json['billingPlan'] === 'object' && json['billingPlan'] !== null) { this.billingPlan = new BillingPlan(json['billingPlan']); }
    if (json['billingPlan'] === null) { this.billingPlan = null; }
    if (typeof json['availableDocsCount'] === 'number') { this.availableDocsCount = json['availableDocsCount']; }
    if (typeof json['language'] === 'string') { this.language = json['language']; }
    if (typeof json['signedDocumentsCount'] === 'number') {
      this.signedDocumentsCount = json['signedDocumentsCount'];
    }
    if (typeof json['documentEventList'] === 'object') {
      this.documentEventList = [];
      for (let obj of json['documentEventList']) {
        this.documentEventList.push(new DocumentEvent(obj));
      }
    }
    if (typeof json['outgoingDocumentList'] === 'object') {
      this.outgoingDocumentList = [];
      for (let obj of json['outgoingDocumentList']) {
        this.outgoingDocumentList.push(new Document(obj));
      }
    }
    if (typeof json['incomingDocumentList'] === 'object') {
      this.incomingDocumentList = [];
      for (let obj of json['incomingDocumentList']) {
        this.incomingDocumentList.push(new Document(obj));
      }
    }
    if (typeof json['trustedIdList'] === 'object') {
      this.trustedIdList = [];
      for (let str of json['trustedIdList']) {
        this.trustedIdList.push(str);
      }
    }
    // if (typeof json['touchCredentials'] == 'object') { this.touchCredentials = []; this.touchCredentials = json['touchCredentials']; }
    if (typeof json['signatureSize'] === 'number') { this.signatureSize = json['signatureSize']; }
    if (typeof json['hashId'] === 'string') { this.hashId = json['hashId']; }
    if (typeof json['deviceId'] === 'string') { this.deviceId = json['deviceId']; }
    if (typeof json['isExist'] === 'boolean') { this.isExist = json['isExist']; }
    if (typeof json['updated'] === 'number') { this.updated = json['updated']; }
    if (typeof json['created'] === 'number') { this.created = json['created']; }
    if (typeof json["roles"] === "object") for (let val of json["roles"]) { this.roles.push(val); }
    if (typeof json["name"] === "string") this.name = json["name"];
    if (typeof json["firstName"] === "string") this.firstName = json["firstName"];
    if (typeof json["lastName"] === "string") this.lastName = json["lastName"];
    if (typeof json["middleName"] === "string") this.middleName = json["middleName"];
    if (typeof json['signature'] === 'object' && json['signature'] !== null) { this.signature = new Image(json['signature']); }
    if (json['signature'] === null) { this.signature = null; }
    if (typeof json['stamp'] === 'object' && json['stamp'] !== null) { this.stamp = new Image(json['stamp']); }
    if (json['stamp'] === null) { this.stamp = null; }
    if (typeof json["phone"] === "string") this.phone = json["phone"];
    if (typeof json["email"] === "string") this.email = json["email"];
    if (typeof json["password"] === "string") this.password = json["password"];
  }
}

export class SignatureLocationData {
  public static schema: Realm.ObjectSchema = {
    name: 'SignatureLocationData',
    primaryKey: 'hashId',
    properties: {
      pageNum: { type: 'int', optional: false },
      perсCoordinates: { type: 'double[]', optional: false },

      hashId: 'string',
      isExist: 'bool',
      updated: 'int',
      created: 'int',
    }
  };
  public hashId: string = uuidv4();
  public isExist: boolean = true;
  public updated: number = Date.now() / 1000;
  public created: number = Date.now() / 1000;
  public pageNum: number = Number();
  public perсCoordinates: number[] = [];

  constructor(json: JSON | { [key: string]: any; }) {
    this.parseData(json);
  }

  parseData(json: { [index: string]: any; }) {
    if (typeof json['perсCoordinates'] === 'object') {
      this.perсCoordinates = [];
      for (let str of json['perсCoordinates']) { this.perсCoordinates.push(str); }
    }
    if (typeof json['pageNum'] === 'number') { this.pageNum = json['pageNum']; }
    if (typeof json['hashId'] === 'string') { this.hashId = json['hashId']; }
    if (typeof json['isExist'] === 'boolean') { this.isExist = json['isExist']; }
    if (typeof json['updated'] === 'number') { this.updated = json['updated']; }
    if (typeof json['created'] === 'number') { this.created = json['created']; }
  }
}

export class BillingPlan {
  public static schema: Realm.ObjectSchema = {
    name: 'BillingPlan',
    primaryKey: 'hashId',
    properties: {
      price: { type: 'int', optional: false },
      outgoingDocsPerMonth: { type: 'int', optional: false }, // 0 for free
      name: { type: 'string', optional: false },
      isFree: { type: 'bool', optional: false },

      hashId: 'string',
      isExist: 'bool',
      updated: 'int',
      created: 'int',
    }
  };
  public price: number = Number();
  public outgoingDocsPerMonth: number = Number();
  public isFree: boolean = Boolean();
  public name: string = String();

  public hashId: string = uuidv4();
  public isExist: boolean = true;
  public updated: number = Date.now() / 1000;
  public created: number = Date.now() / 1000;

  constructor(json: JSON | { [key: string]: any; }) {
    this.parseData(json);
  }

  parseData(json: { [index: string]: any; }) {
    if (typeof json['name'] === 'string') { this.name = json['name']; }
    if (typeof json['isFree'] === 'boolean') { this.isFree = json['isFree']; }
    if (typeof json['price'] === 'number') { this.price = json['price']; }
    if (typeof json['outgoingDocsPerMonth'] === 'number') { this.outgoingDocsPerMonth = json['outgoingDocsPerMonth']; }
    if (typeof json['hashId'] === 'string') { this.hashId = json['hashId']; }
    if (typeof json['isExist'] === 'boolean') { this.isExist = json['isExist']; }
    if (typeof json['updated'] === 'number') { this.updated = json['updated']; }
    if (typeof json['created'] === 'number') { this.created = json['created']; }
  }
}

export class Document {
  public static schema: Realm.ObjectSchema = {
    name: 'Document',
    primaryKey: 'hashId',
    properties: {
      hashId: 'string',
      isExist: 'bool',
      updated: 'int',
      created: 'int',

      currentPdf: 'Pdf',
      name: { type: 'string', optional: false },
      documentStateList: 'DocumentState[]',
      type: { type: 'string', optional: false },
      hostUserHashId: { type: 'string', optional: false },
      hostUserName: { type: 'string', optional: false },
      hostUserEmail: { type: 'string', optional: false },
      guestUserHashId: { type: 'string', optional: false },
      guestUserName: { type: 'string', optional: false },
      guestUserEmail: { type: 'string', optional: false },
      // массив вида [pagenum,x,y, pagenum,x,y, ...]
      guestSigntureLocationDataAsNumArray: { type: 'double[]', optional: false },
      // если стейт - ожидание подписи, то архивируем (это не дает подписать в будущем)
      archivingTimestamp: { type: 'int', optional: false },
      // если стейт - ожидание подписи, то отправляем нотификации
      notificationTimestampList: { type: 'int[]', optional: false },
      lastDocumentEvent: { type: 'DocumentEvent', optional: false },
      // работа с документом закончена
      isNewForGuest: { type: 'bool', optional: false },
      isNewForHost: { type: 'bool', optional: false },
    }
  };
  public hashId: string = uuidv4();
  public isExist: boolean = true;
  public updated: number = Date.now() / 1000;
  public created: number = Date.now() / 1000;

  public currentPdf: Pdf | null = null;
  public type: string = String();
  public name: string = String();
  public documentStateList: DocumentState[] = [];
  public hostUserHashId: string = String();
  public guestUserHashId: string = String();
  public archivingTimestamp: number = Number();
  public notificationTimestampList: number[] = [];
  public guestSigntureLocationDataAsNumArray: number[] = [];
  public hostUserName: string = String();
  public hostUserEmail: string = String();
  public guestUserName: string = String();
  public guestUserEmail: string = String();
  public lastDocumentEvent: DocumentEvent | null = null;
  public isNewForGuest: boolean = Boolean();
  public isNewForHost: boolean = Boolean();

  constructor(json: JSON | { [key: string]: any; }) { this.parseData(json); }

  parseData(json: { [index: string]: any; }) {
    if (typeof json['lastDocumentEvent'] === 'object' && json['lastDocumentEvent'] !== null) { this.lastDocumentEvent = new DocumentEvent(json['lastDocumentEvent']); }
    if (typeof json['notificationTimestampList'] === 'object') { this.notificationTimestampList = []; for (let str of json['notificationTimestampList']) { this.notificationTimestampList.push(str); } }
    if (json['lastDocumentEvent'] === null) { this.lastDocumentEvent = null; }
    if (typeof json['isNewForGuest'] === 'boolean') { this.isNewForGuest = json['isNewForGuest']; }
    if (typeof json['isNewForHost'] === 'boolean') { this.isNewForHost = json['isNewForHost']; }
    if (typeof json['guestUserEmail'] === 'string') { this.guestUserEmail = json['guestUserEmail']; }
    if (typeof json['hostUserEmail'] === 'string') { this.hostUserEmail = json['hostUserEmail']; }
    if (typeof json['hostUserName'] === 'string') { this.hostUserName = json['hostUserName']; }
    if (typeof json['guestUserName'] === 'string') { this.guestUserName = json['guestUserName']; }
    if (typeof json['archivingTimestamp'] === 'number') { this.archivingTimestamp = json['archivingTimestamp']; }
    if (typeof json['guestSigntureLocationDataAsNumArray'] === 'object') {
      this.guestSigntureLocationDataAsNumArray = [];
      for (let str of json['guestSigntureLocationDataAsNumArray']) { this.guestSigntureLocationDataAsNumArray.push(str); }
    }
    if (typeof json['type'] === 'string') { this.type = json['type']; }
    if (typeof json['hostUserHashId'] === 'string') { this.hostUserHashId = json['hostUserHashId']; }
    if (typeof json['guestUserHashId'] === 'string') { this.guestUserHashId = json['guestUserHashId']; }
    if (typeof json['currentPdf'] === 'object' && json['currentPdf'] !== null) { this.currentPdf = new Pdf(json['currentPdf']); }
    if (json['currentPdf'] === null) { this.currentPdf = null; }
    // if (typeof json['currentImageList'] === 'object') {
    //   this.currentImageList = [];
    //   for (let obj of json['currentImageList']) {
    //     this.currentImageList.push(new Image(obj));
    //   }
    // }
    if (typeof json['name'] === 'string') { this.name = json['name']; }
    if (typeof json['documentStateList'] === 'object') {
      this.documentStateList = [];
      for (let obj of json['documentStateList']) {
        this.documentStateList.push(new DocumentState(obj));
      }
    }
    if (typeof json['hashId'] === 'string') { this.hashId = json['hashId']; }
    if (typeof json['isExist'] === 'boolean') { this.isExist = json['isExist']; }
    if (typeof json['updated'] === 'number') { this.updated = json['updated']; }
    if (typeof json['created'] === 'number') { this.created = json['created']; }
  }
}

export class DocumentState {
  public static schema: Realm.ObjectSchema = {
    name: 'DocumentState',
    primaryKey: 'hashId',
    properties: {
      hashId: 'string',

      userHashId: 'string',
      state: 'string',
      deviceData: { type: 'string', optional: false },
      index: { type: 'int', optional: false },
      documentHashId: { type: 'string', optional: false },

      isExist: 'bool',
      updated: 'int',
      created: 'int',
    }
  };
  public hashId: string = uuidv4();
  public isExist: boolean = true;
  public updated: number = Date.now() / 1000;
  public created: number = Date.now() / 1000;

  public userHashId: string = String();
  public state: string = String();
  public deviceData: string = String();
  public index: number = Number();
  public documentHashId: string = String();

  constructor(json: JSON | { [key: string]: any; }) {
    this.parseData(json);
  }

  parseData(json: { [index: string]: any; }) {
    if (typeof json['documentHashId'] === 'string') { this.documentHashId = json['documentHashId']; }
    if (typeof json['index'] === 'number') { this.index = json['index']; }
    if (typeof json['deviceData'] === 'string') { this.deviceData = json['deviceData']; }
    if (typeof json['userHashId'] === 'string') { this.userHashId = json['userHashId']; }
    if (typeof json['state'] === 'string') { this.state = json['state']; }
    if (typeof json['hashId'] === 'string') { this.hashId = json['hashId']; }
    if (typeof json['isExist'] === 'boolean') { this.isExist = json['isExist']; }
    if (typeof json['updated'] === 'number') { this.updated = json['updated']; }
    if (typeof json['created'] === 'number') { this.created = json['created']; }
  }
}

export class DocumentEvent {
  public static schema: Realm.ObjectSchema = {
    name: 'DocumentEvent',
    primaryKey: 'hashId',
    properties: {
      hashId: 'string',
      isExist: 'bool',
      updated: 'int',
      created: 'int',

      deviceData: { type: 'string', optional: false },
      documentHashId: { type: 'string', optional: false },
      documentName: { type: 'string', optional: false },
      type: { type: 'string', optional: false },
      guestUserName: { type: 'string', optional: false },
      guestUserEmail: { type: 'string', optional: false },
      isNewForHost: { type: 'bool', optional: false },
    }
  };

  public deviceData: string = String();
  public hashId: string = uuidv4();
  public isExist: boolean = true;
  public updated: number = Date.now() / 1000;
  public created: number = Date.now() / 1000;
  public type: string = String();
  public documentHashId: string = String();
  public documentName: string = String();
  public guestUserName: string = String();
  public isNewForHost: boolean = true;
  public guestUserEmail: string = String();

  constructor(json: JSON | { [key: string]: any; }) {
    this.parseData(json);
  }

  parseData(json: { [index: string]: any; }) {
    if (typeof json['deviceData'] === 'string') { this.deviceData = json['deviceData']; }
    if (typeof json['guestUserEmail'] === 'string') { this.guestUserEmail = json['guestUserEmail']; }
    if (typeof json['isNewForHost'] === 'boolean') { this.isNewForHost = json['isNewForHost']; }
    if (typeof json['guestUserName'] === 'string') { this.guestUserName = json['guestUserName']; }
    if (typeof json['type'] === 'string') { this.type = json['type']; }
    if (typeof json['documentHashId'] === 'string') { this.documentHashId = json['documentHashId']; }
    if (typeof json['documentName'] === 'string') { this.documentName = json['documentName']; }
    if (typeof json['hashId'] === 'string') { this.hashId = json['hashId']; }
    if (typeof json['isExist'] === 'boolean') { this.isExist = json['isExist']; }
    if (typeof json['updated'] === 'number') { this.updated = json['updated']; }
    if (typeof json['created'] === 'number') { this.created = json['created']; }
  }
}

export class Pdf {
  public static schema: Realm.ObjectSchema = {
    name: 'Pdf',
    primaryKey: 'hashId',
    properties: {
      hashId: 'string',
      file: 'string',
      isExist: 'bool',
      updated: 'int',
      created: 'int',
    }
  };

  public hashId: string = uuidv4();
  public isExist: boolean = true;
  public name: string = String();
  public updated: number = Date.now() / 1000;
  public created: number = Date.now() / 1000;
  public file: string = String();

  constructor(json: JSON | { [key: string]: any; }) {
    this.parseData(json);
  }

  public static deleteFileFromDisk(pdf: Pdf | null) {
    if (pdf == null) return;
    const uri: string | undefined = process.env.URI;
    if (!uri) { console.error(`uri is not found in env file`); return; }
    const filePath = pdf.file.replace(uri, '..');
    unlinkSync(filePath);
  }

  public static getFilePath(pdf: Pdf) {
    const uri: string | undefined = process.env.URI;
    if (!uri) { console.error(`uri is not found in env file`); return String(); }
    return pdf.file.replace(uri, '..');
  }

  // public static getFilePath(pd)

  parseData(json: { [index: string]: any; }) {
    if (typeof json['name'] === 'string') { this.name = json['name']; }
    if (typeof json['hashId'] === 'string') { this.hashId = json['hashId']; }
    if (typeof json['isExist'] === 'boolean') { this.isExist = json['isExist']; }
    if (typeof json['updated'] === 'number') { this.updated = json['updated']; }
    if (typeof json['created'] === 'number') { this.created = json['created']; }
    if (typeof json['file'] === 'string') { this.file = json['file']; }
  }
}

export class Image {
  public static schema: Realm.ObjectSchema = {
    name: 'Image',
    primaryKey: 'hashId',
    properties: {
      hashId: 'string',

      preview: "string",
      mid: "string",
      original: "string",
      fileType: "string",
      isInUse: 'bool',

      isExist: 'bool',
      updated: 'int',
      created: 'int',
    }
  };

  public isInUse: boolean = Boolean();
  public hashId: string = uuidv4();
  public isExist: boolean = true;
  public updated: number = Date.now() / 1000;
  public created: number = Date.now() / 1000;
  public preview: string = String();
  public mid: string = String();
  public original: string = String();
  public fileType: string = String();

  constructor(json: JSON | { [key: string]: any; }) {
    this.parseData(json);
  }

  public static deleteFileFromDisk(image: Image) {
    const uri: string | undefined = process.env.URI;
    if (!uri) { console.error(`uri is not found in env file`); return; }
    [image.preview, image.mid, image.original]
      // обеспечиваем уникальность путей (если файл в одном экземпляре сохранён)
      .filter((value, index, arr) => { return arr.indexOf(value) === index; })
      // меняем url на путь к файлу
      .map(imgUrl => { return imgUrl.replace(uri, '..'); })
      // проверяем существование файла
      .filter(imgFilePath => { return existsSync(imgFilePath); })
      // удаляем файл
      .forEach(existingImgFilePath => { unlinkSync(existingImgFilePath); });
  }

  public static getImagePath(image: Image | null, size: string = 'original') {
    if (!image) { return; }
    const uri: string | undefined = process.env.URI;
    if (!uri) { console.error(`uri is not found in env file`); return; }
    switch (size) {
      case 'original':
        return image.original.replace(uri, '..');
      case 'preview':
        return image.preview.replace(uri, '..');
      case 'mid':
        return image.mid.replace(uri, '..');
    }
  }

  parseData(json: { [index: string]: any; }) {
    if (typeof json['hashId'] === 'string') { this.hashId = json['hashId']; }
    if (typeof json['isExist'] === 'boolean') { this.isExist = json['isExist']; }
    if (typeof json['updated'] === 'number') { this.updated = json['updated']; }
    if (typeof json['created'] === 'number') { this.created = json['created']; }
    if (typeof json["fileType"] === "string") this.fileType = json["fileType"];
    if (typeof json["preview"] === "string") this.preview = json["preview"];
    if (typeof json['isInUse'] === 'boolean') { this.isInUse = json['isInUse']; }
    if (typeof json["mid"] === "string") this.mid = json["mid"];
    if (typeof json["original"] === "string") this.original = json["original"];
  }
}

export class Validation {
  public static schema: Realm.ObjectSchema = {
    name: 'Validation',
    primaryKey: 'hashId',
    properties: {
      hashId: 'string',
      email: "string",
      phone: "string",
      code: "string",

      isExist: 'bool',
      updated: 'int',
      created: 'int',
    }
  };

  public hashId: string = uuidv4();
  public isExist: boolean = true;
  public updated: number = Date.now() / 1000;
  public created: number = Date.now() / 1000;
  public email: string = String();
  public phone: string = String();
  public code: string = String();

  constructor(json: JSON) {
    this.parseData(json);
  }

  parseData(json: { [index: string]: any; }) {
    if (typeof json['hashId'] === 'string') { this.hashId = json['hashId']; }
    if (typeof json['isExist'] === 'boolean') { this.isExist = json['isExist']; }
    if (typeof json['updated'] === 'number') { this.updated = json['updated']; }
    if (typeof json['created'] === 'number') { this.created = json['created']; }
    if (typeof json["email"] === "string") this.email = json["email"];
    if (typeof json["phone"] === "string") this.phone = json["phone"];
    if (typeof json["code"] === "string") this.code = json["code"];
  }
}
