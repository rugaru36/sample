import { Enums } from '@model/enum';
import { Validation } from '@model/models';
import { UserDao } from '@dao/userDao';
import { ImageDao } from '@dao/imageDao';
import { PdfDao } from '@dao/pdfDao';
import { ValidationDao } from '@dao/validationDao';
import { DocumentDao } from '@dao/documentDao';
import { DocumentEventDao } from '@dao/documentEventDao';

type DatabaseRequestBody = {
  router: string;
  collectionName: string;
  elementId: string;
  filter?: string;
  jsonValues: JSON;
  cashTime: number;
  pageNum?: number;
  pageSize?: number;
};

export class DatabaseService {
  public router: string = String();
  public collectionName: string = String();
  public elementId: string = String();
  public filter: string | undefined;
  public pageNum: number | undefined;
  public pageSize: number | undefined;
  public inputJsonData: JSON = JSON.parse(JSON.stringify({}));

  constructor() { }

  public async parseRequest(body: DatabaseRequestBody): Promise<void> {
    try {
      let elementId = body.elementId;
      let filter = body.filter;
      let json = body.jsonValues;

      this.collectionName = body.collectionName;
      this.router = body.router;
      switch (typeof elementId) {
        case 'string': this.elementId = elementId; break;
        default: throw Error(`elementId "${elementId}" invalid type ${typeof elementId}`);
      }

      switch (typeof filter) {
        case 'string': this.filter = filter; break;
        case 'undefined': this.filter = undefined; break;
        default: throw Error(`filter "${body.filter}" invalid type ${typeof filter}`);
      }

      switch (typeof json) {
        case 'object': this.inputJsonData = json; break;
        case 'undefined': this.inputJsonData = JSON.parse(JSON.stringify({})); break;
        default: throw Error(`json "${json}" invalid type ${typeof json}`);
      }
    } catch (e) {
      console.error(`DatabaseService.parseRequest ${e.message}`);
      throw Error(e.message);
    }
  }

  public async provideRequest() {
    try {
      switch (this.collectionName) {
        case Enums.DatabaseCollection.Image: return await this.collectionImage();
        case Enums.DatabaseCollection.User: return await this.collectionUser();
        case Enums.DatabaseCollection.Pdf: return await this.collectionPdf();
        case Enums.DatabaseCollection.Document: return await this.collectionDocument();
        case Enums.DatabaseCollection.DocumentEvent: return await this.collectionDocumentEvent();
        case Enums.DatabaseCollection.Validation: return await this.collectionValidation();
        default: throw Error(`collection "${this.collectionName}" not found`);
      }
    } catch (e) {
      console.error(`DatabaseService.provideRequest ${e.message}`);
      throw Error(e.message);
    }
  }

  private async collectionImage() {
    try {
      let dao = new ImageDao();
      switch (this.router) {
        case Enums.DatabaseRouter.fetch:
          if (this.filter && this.filter !== String()) return dao.getByFilter(this.filter);
          if (this.elementId === String()) return dao.getAll();
          if (this.elementId !== String()) { return await dao.getById(this.elementId); }
        case Enums.DatabaseRouter.update:
          if (this.elementId === String()) { await dao.save(this.inputJsonData); return; }
          if (this.elementId !== String()) { await dao.update(this.elementId, this.inputJsonData); return; }
        case Enums.DatabaseRouter.delete:
          if (this.elementId !== String()) return dao.deleteById(this.elementId);
        case Enums.DatabaseRouter.recover:
          if (this.elementId !== String()) return dao.recoverById(this.elementId);
        default: throw Error(`collection ${this.collectionName} invalid router member ${this.router}}`);
      }
    } catch (e) {
      console.error(e.message);
      throw Error(e.message);
    }
  }

  private async collectionUser() {
    try {
      let dao = new UserDao();
      switch (this.router) {
        case Enums.DatabaseRouter.fetch:
          if (this.filter && this.filter !== String()) return dao.getByFilter(this.filter);
          if (this.elementId === String()) return dao.getAll();
          if (this.elementId !== String()) { return await dao.getById(this.elementId); }
        case Enums.DatabaseRouter.update:
          if (this.elementId === String()) { dao.save(this.inputJsonData); return; }
          if (this.elementId !== String()) { dao.update(this.elementId, this.inputJsonData); return; }
        case Enums.DatabaseRouter.delete:
          if (this.elementId !== String()) return dao.deleteById(this.elementId);
        case Enums.DatabaseRouter.recover:
          if (this.elementId !== String()) return dao.recoverById(this.elementId);
        default: throw Error(`collection ${this.collectionName} invalid router member ${this.router}}`);
      }
    } catch (e) {
      console.error(e.message);
      throw Error(e.message);
    }
  }

  private async collectionPdf() {
    try {
      let dao = new PdfDao();
      switch (this.router) {
        case Enums.DatabaseRouter.fetch:
          if (this.filter && this.filter !== String()) return dao.getByFilter(this.filter);
          if (this.elementId === String()) return dao.getAll();
          if (this.elementId !== String()) { return await dao.getById(this.elementId); }
        case Enums.DatabaseRouter.update:
          if (this.elementId === String()) { dao.save(this.inputJsonData); return; }
          if (this.elementId !== String()) { dao.update(this.elementId, this.inputJsonData); return; }
        case Enums.DatabaseRouter.delete:
          if (this.elementId !== String()) return dao.deleteById(this.elementId);
        case Enums.DatabaseRouter.recover:
          if (this.elementId !== String()) return dao.recoverById(this.elementId);
        default: throw Error(`collection ${this.collectionName} invalid router member ${this.router}}`);
      }
    } catch (e) {
      console.error(e.message);
      throw Error(e.message);
    }
  }

  private async collectionDocument() {
    try {
      let dao = new DocumentDao();
      switch (this.router) {
        case Enums.DatabaseRouter.fetch:
          if (this.filter && this.filter !== String()) return dao.getByFilter(this.filter);
          if (this.elementId === String()) return dao.getAll();
          if (this.elementId !== String()) { return await dao.getById(this.elementId); }
        case Enums.DatabaseRouter.update:
          if (this.elementId === String()) { dao.save(this.inputJsonData); return; }
          if (this.elementId !== String()) { dao.update(this.elementId, this.inputJsonData); return; }
        case Enums.DatabaseRouter.delete:
          if (this.elementId !== String()) return dao.deleteById(this.elementId);
        case Enums.DatabaseRouter.recover:
          if (this.elementId !== String()) return dao.recoverById(this.elementId);
        default: throw Error(`collection ${this.collectionName} invalid router member ${this.router}}`);
      }
    } catch (e) {
      console.error(e.message);
      throw Error(e.message);
    }
  }

  private async collectionDocumentEvent() {
    try {
      let dao = new DocumentEventDao();
      switch (this.router) {
        case Enums.DatabaseRouter.fetch:
          if (this.filter && this.filter !== String()) return dao.getByFilter(this.filter);
          if (this.elementId === String()) return dao.getAll();
          if (this.elementId !== String()) { return await dao.getById(this.elementId); }
        case Enums.DatabaseRouter.update:
          if (this.elementId === String()) { dao.save(this.inputJsonData); return; }
          if (this.elementId !== String()) { dao.update(this.elementId, this.inputJsonData); return; }
        case Enums.DatabaseRouter.delete:
          if (this.elementId !== String()) return dao.deleteById(this.elementId);
        case Enums.DatabaseRouter.recover:
          if (this.elementId !== String()) return dao.recoverById(this.elementId);
        default: throw Error(`collection ${this.collectionName} invalid router member ${this.router}}`);
      }
    } catch (e) {
      console.error(e.message);
      throw Error(e.message);
    }
  }

  private async collectionValidation(): Promise<Realm.Results<Validation & Realm.Object> | Validation & Realm.Object | void> {
    try {
      let dao = new ValidationDao();
      switch (this.router) {
        case Enums.DatabaseRouter.fetch:
          if (this.filter && this.filter !== String()) return dao.getByFilter(this.filter);
          if (this.elementId === String()) return dao.getAll();
          if (this.elementId !== String()) { return await dao.getById(this.elementId); }
        case Enums.DatabaseRouter.update:
          if (this.elementId === String()) { dao.save(this.inputJsonData); return; }
          if (this.elementId !== String()) { dao.update(this.elementId, this.inputJsonData); return; }
        case Enums.DatabaseRouter.delete:
          if (this.elementId !== String()) return dao.deleteById(this.elementId);
        case Enums.DatabaseRouter.recover:
          if (this.elementId !== String()) return dao.recoverById(this.elementId);
        default: throw Error(`collection ${this.collectionName} invalid router member ${this.router}}`);
      }
    } catch (e) {
      console.error(e.message);
      throw Error(e.message);
    }
  }
}