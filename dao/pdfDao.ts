import { Pdf } from '@model/models';
import { db } from '@database/realm';
// import Realm from 'realm'

export class PdfDao {

  constructor() { }

  // MARK: getByID

  public async getById(id: string): Promise<Pdf & Realm.Object | undefined> {
    return db.realm.objectForPrimaryKey(Pdf.schema.name, id);
  }

  // MARK: getAll

  public async getAll(): Promise<Realm.Results<Pdf & Realm.Object>> {
    return await db.realm.objects<Pdf>(Pdf.schema.name);
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
    return await db.realm.objects<Pdf>(Pdf.schema.name).filtered(filter).slice(firstItemNum, lastItemNum);
  }

  // MARK: save

  public async save(json: JSON | { [key: string]: any; }): Promise<Pdf & Realm.Object | undefined> {
    let model = new Pdf(json);
    await db.realm.write(() => {
      return db.realm.create<Pdf>(Pdf.schema.name, model, Realm.UpdateMode.Modified);
    });
    return await this.getById(model.hashId);
  }

  // MARK: update

  public async update(id: string, json: JSON): Promise<Pdf & Realm.Object | undefined> {
    try {
      let object = db.realm.objectForPrimaryKey<Pdf>(Pdf.schema.name, id);
      if (object) {
        let model = new Pdf(object.toJSON());
        model.parseData(json);
        model.updated = Date.now() / 1000;
        await db.realm.write(() => {
          return db.realm.create<Pdf>(Pdf.schema.name, model, Realm.UpdateMode.Modified);
        });
        return await this.getById(model.hashId);
      } else {
        throw Error('no object found');
      }
    } catch (e) {
      console.error(`PdfDao.update ${e.message}`);
      throw Error(e.message);
    }
  }

  // MARK: deteleById

  public async deleteById(id: string): Promise<void> {
    let object = db.realm.objectForPrimaryKey<Pdf>(Pdf.schema.name, id);
    if (object) {
      let model = new Pdf(object.toJSON());
      model.isExist = false;
      // console.log('model isExist: false', model)
      return db.realm.write(() => {
        return db.realm.create<Pdf>(Pdf.schema.name, model, Realm.UpdateMode.Modified);
      });
    }
  }

  // MARK: recoverById

  public async recoverById(id: string): Promise<void> {
    let object = db.realm.objectForPrimaryKey<Pdf>(Pdf.schema.name, id);
    if (object) {
      let model = new Pdf(object.toJSON());
      model.isExist = true;
      db.realm.write(() => {
        // console.log('model isExist: true', model)
        return db.realm.create(Pdf.schema.name, model, Realm.UpdateMode.Modified);
      });
    }
  }
}