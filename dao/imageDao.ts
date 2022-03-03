import { Image } from '@model/models';
import { db } from '@database/realm';
// import Realm from 'realm'

export class ImageDao {

  constructor() { }

  // MARK: getByID

  public async getById(id: string): Promise<Image & Realm.Object | undefined> {
    return db.realm.objectForPrimaryKey(Image.schema.name, id);
  }

  // MARK: getAll

  public async getAll(): Promise<Realm.Results<Image & Realm.Object>> {
    return db.realm.objects<Image>(Image.schema.name);
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

    return db.realm.objects<Image>(Image.schema.name).filtered(filter).slice(firstItemNum, lastItemNum);
  }

  // MARK: save

  public async save(json: JSON | { [key: string]: any; }): Promise<Image & Realm.Object | undefined> {
    let model = new Image(json);
    await db.realm.write(() => {
      return db.realm.create<Image>(Image.schema.name, model, Realm.UpdateMode.Modified);
    });
    return await this.getById(model.hashId);
  }

  // MARK: update

  public async update(id: string, json: JSON | { [key: string]: any; }): Promise<Image & Realm.Object | undefined> {
    try {
      let object = db.realm.objectForPrimaryKey<Image>(Image.schema.name, id);
      if (object) {
        let model = new Image(object.toJSON());
        model.parseData(json);
        model.updated = Date.now() / 1000;
        await db.realm.write(() => {
          return db.realm.create<Image>(Image.schema.name, model, Realm.UpdateMode.Modified);
        });
        return await this.getById(model.hashId);
      } else {
        throw Error('no object found');
      }
    } catch (e) {
      console.error(`ImageDao.update ${e.message}`);
      throw Error(e.message);
    }
  }

  // MARK: deteleById

  public async deleteById(id: string): Promise<void> {
    let object = db.realm.objectForPrimaryKey<Image>(Image.schema.name, id);
    if (object) {
      let model = new Image(object.toJSON());
      model.isExist = false;
      // console.log('model isExist: false', model)
      return db.realm.write(() => {
        return db.realm.create<Image>(Image.schema.name, model, Realm.UpdateMode.Modified);
      });
    }
  }

  // MARK: recoverById

  public async recoverById(id: string): Promise<void> {
    let object = db.realm.objectForPrimaryKey<Image>(Image.schema.name, id);
    if (object) {
      let model = new Image(object.toJSON());
      model.isExist = true;
      db.realm.write(() => {
        // console.log('model isExist: true', model)
        return db.realm.create(Image.schema.name, model, Realm.UpdateMode.Modified);
      });
    }
  }
}