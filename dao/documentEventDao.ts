import { DocumentEvent } from '@model/models';
import { db } from '@database/realm';
// import Realm from 'realm'

export class DocumentEventDao {

  constructor() { }

  // MARK: getByID

  public async getById(id: string): Promise<DocumentEvent & Realm.Object | undefined> {
    return db.realm.objectForPrimaryKey(DocumentEvent.schema.name, id);
  }

  // MARK: getAll

  public async getAll(pageSize: number | undefined = undefined, pageNum: number | undefined = undefined) {
    let firstItemNum: number | undefined = undefined;
    let lastItemNum: number | undefined = undefined;
    if (pageSize && pageNum) {
      lastItemNum = Math.floor(pageSize * (pageNum + 1));
      firstItemNum = lastItemNum - pageSize;
    }
    return db.realm.objects<DocumentEvent>(DocumentEvent.schema.name).slice(firstItemNum, lastItemNum);
  }

  // MARK: getByFilter

  public async getByFilter(filter: string, pageSize: number | undefined = undefined, pageNum: number | undefined = undefined) {
    // let filterWithCashTime = `(${filter}) && updated > ${cashTime}`;
    let firstItemNum: number | undefined = undefined;
    let lastItemNum: number | undefined = undefined;
    if (pageSize && pageNum) {
      lastItemNum = Math.floor(pageSize * (pageNum + 1));
      firstItemNum = lastItemNum - pageSize;
    }

    return db.realm.objects<DocumentEvent>(DocumentEvent.schema.name).filtered(filter).slice(firstItemNum, lastItemNum);
  }

  // MARK: save

  public async save(json: JSON | { [key: string]: any; }): Promise<DocumentEvent & Realm.Object | undefined> {
    let model = new DocumentEvent(json);
    await db.realm.write(() => {
      return db.realm.create<DocumentEvent>(DocumentEvent.schema.name, model, Realm.UpdateMode.Modified);
    });
    return await this.getById(model.hashId);
  }

  // MARK: update

  public async update(id: string, json: JSON | { [key: string]: any; }): Promise<DocumentEvent & Realm.Object | undefined> {
    try {
      let object = db.realm.objectForPrimaryKey<DocumentEvent>(DocumentEvent.schema.name, id);
      if (object) {
        let model = new DocumentEvent(object.toJSON());
        model.parseData(json);
        model.updated = Date.now() / 1000;
        await db.realm.write(() => {
          return db.realm.create<DocumentEvent>(DocumentEvent.schema.name, model, Realm.UpdateMode.Modified);
        });
        return await this.getById(model.hashId);
      } else {
        throw Error('no object found');
      }
    } catch (e) {
      console.error(`DocumentEventDao.update ${e.message}`);
      throw Error(e.message);
    }
  }

  // MARK: deteleById

  public async deleteById(id: string): Promise<void> {
    let object = db.realm.objectForPrimaryKey<DocumentEvent>(DocumentEvent.schema.name, id);
    if (object) {
      let model = new DocumentEvent(object.toJSON());
      model.isExist = false;
      // console.log('model isExist: false', model)
      return db.realm.write(() => {
        return db.realm.create<DocumentEvent>(DocumentEvent.schema.name, model, Realm.UpdateMode.Modified);
      });
    }
  }

  // MARK: recoverById

  public async recoverById(id: string): Promise<void> {
    let object = db.realm.objectForPrimaryKey<DocumentEvent>(DocumentEvent.schema.name, id);
    if (object) {
      let model = new DocumentEvent(object.toJSON());
      model.isExist = true;
      db.realm.write(() => {
        // console.log('model isExist: true', model)
        return db.realm.create(DocumentEvent.schema.name, model, Realm.UpdateMode.Modified);
      });
    }
  }
}