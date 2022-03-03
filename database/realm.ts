import Realm from 'realm';
import { User } from '@model/models';
import { Pdf } from '@model/models';
import { Image } from '@model/models';
import { Validation } from '@model/models';
import { DocumentEvent } from '@model/models';
import { Document } from '@model/models';
import { DocumentState } from '@model/models';
import { BillingPlan } from '@model/models';

class Database {
  private static instance: Database;
  public realm: Realm;

  constructor() {
    this.realm = new Realm({
      path: '../realm/Realm',
      schemaVersion: 39,
      schema: [
        User.schema,
        Pdf.schema,
        Image.schema,
        Validation.schema,
        BillingPlan.schema,
        Document.schema,
        DocumentState.schema,
        DocumentEvent.schema,
      ],
      deleteRealmIfMigrationNeeded: false
    });
  }

  static getInstance() {
    if (!Database.instance) { Database.instance = new Database(); }
    return Database.instance;
  }

  public getSchema() {
    return this.realm.schema;
  }
}

export const db = Database.getInstance();