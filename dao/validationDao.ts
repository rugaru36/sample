import { Validation } from '@model/models';
import { db } from '@database/realm';
// import Realm from 'realm'

export class ValidationDao {

  constructor() { }

  // MARK: getByID

  public async getById(id: string): Promise<Validation & Realm.Object | undefined> {
    return db.realm.objectForPrimaryKey(Validation.schema.name, id);
  }

  // MARK: getAll

  public async getAll(): Promise<Realm.Results<Validation & Realm.Object>> {
    return db.realm.objects<Validation>(Validation.schema.name);
  }

  // MARK: getByFilter

  public async getByFilter(filter: string): Promise<Realm.Results<Validation & Realm.Object>> {
    return db.realm.objects<Validation>(Validation.schema.name).filtered(filter);
  }

  // MARK: save

  public async save(json: JSON): Promise<Validation & Realm.Object | undefined> {
    let model = new Validation(json);
    await db.realm.write(() => {
      return db.realm.create<Validation>(Validation.schema.name, model, Realm.UpdateMode.Modified);
    });
    return await this.getById(model.hashId);
  }

  // MARK: update

  public async update(id: string, json: JSON): Promise<Validation & Realm.Object | undefined> {
    try {
      let object = db.realm.objectForPrimaryKey<Validation>(Validation.schema.name, id);
      if (object) {
        let model = new Validation(object.toJSON());
        model.parseData(json);
        model.updated = Date.now() / 1000;
        await db.realm.write(() => {
          return db.realm.create<Validation>(Validation.schema.name, model, Realm.UpdateMode.Modified);
        });
        return await this.getById(model.hashId);
      } else {
        throw Error('no object found');
      }
    } catch (e) {
      console.error(`ValidationDao.update ${e.message}`);
      throw Error(e.message);
    }
  }

  // MARK: deteleById

  public async deleteById(id: string): Promise<void> {
    let object = db.realm.objectForPrimaryKey<Validation>(Validation.schema.name, id);
    if (object) {
      let model = new Validation(object.toJSON());
      model.isExist = false;
      // console.log('model isExist: false', model)
      return db.realm.write(() => {
        return db.realm.create<Validation>(Validation.schema.name, model, Realm.UpdateMode.Modified);
      });
    }
  }

  // MARK: recoverById

  public async recoverById(id: string): Promise<void> {
    let object = db.realm.objectForPrimaryKey<Validation>(Validation.schema.name, id);
    if (object) {
      let model = new Validation(object.toJSON());
      model.isExist = true;
      db.realm.write(() => {
        // console.log('model isExist: true', model)
        return db.realm.create(Validation.schema.name, model, Realm.UpdateMode.Modified);
      });
    }
  }
}