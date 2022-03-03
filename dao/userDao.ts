import { User } from '@model/models';
import { db } from '@database/realm';
// import Realm from 'realm'

export class UserDao {

  constructor() { }

  // MARK: getByID

  public async getById(id: string): Promise<User & Realm.Object | undefined> {
    return db.realm.objectForPrimaryKey(User.schema.name, id);
  }

  // MARK: getAll

  public async getAll(): Promise<Realm.Results<User & Realm.Object>> {
    return db.realm.objects<User>(User.schema.name);
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
    return db.realm.objects<User>(User.schema.name).filtered(filter).slice(firstItemNum, lastItemNum);
  }

  // MARK: save

  public save(json: JSON | { [key: string]: any; }): Promise<User & Realm.Object | undefined> {
    return new Promise((resolve) => {
      let model = new User(json);
      db.realm.write(() => {
        resolve(db.realm.create<User>(User.schema.name, model, Realm.UpdateMode.Modified));
      });
    });
  }

  // MARK: update

  public update(id: string, json: JSON | { [key: string]: any; }): Promise<User & Realm.Object | undefined> {
    return new Promise((res, rej) => {
      try {
        let object = db.realm.objectForPrimaryKey<User>(User.schema.name, id);
        if (object) {
          let model = new User(object.toJSON());
          model.parseData(json);
          model.updated = Date.now() / 1000;
          db.realm.write(() => {
            res(db.realm.create<User>(User.schema.name, model, Realm.UpdateMode.Modified));
          });
        } else {
          throw Error('no object found');
        }
      } catch (e) {
        console.error(`UserDao.update ${e.message}`);
        rej(e);
      }

    });
  }

  // MARK: deteleById

  public async deleteById(id: string): Promise<void> {
    let object = db.realm.objectForPrimaryKey<User>(User.schema.name, id);
    if (object) {
      let model = new User(object.toJSON());
      model.isExist = false;
      return db.realm.write(() => {
        return db.realm.create<User>(User.schema.name, model, Realm.UpdateMode.Modified);
      });
    }
  }

  // MARK: recoverById

  public async recoverById(id: string): Promise<void> {
    let object = db.realm.objectForPrimaryKey<User>(User.schema.name, id);
    if (object) {
      let model = new User(object.toJSON());
      model.isExist = true;
      db.realm.write(() => {
        return db.realm.create(User.schema.name, model, Realm.UpdateMode.Modified);
      });
    }
  }
}