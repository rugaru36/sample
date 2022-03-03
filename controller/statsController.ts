import { Request, Response } from 'express';
import { UserDao } from '@dao/userDao';
import { DocumentDao } from '@dao/documentDao';
import { Document, User } from '@model/models';
const correctPass: string = 'qwerty123';

type UserStatData = {
  id: string;
  email: string,
  firstName: string;
  lastName: string,
  incomingDocumentsCount: number,
  outgoingDocumentsCount: number;
};

type DocumentStatData = {
  id: string;
  name: string;
  type: string;
  lastEventType: string;
  state: string;
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const pass: string | undefined = req.query.pass;
    if (!pass && pass != correctPass) { throw Error('pass is wrong!'); }
    const week: number = 1000 * 60 * 60 * 24 * 7;
    const currTime: number = Date.now();
    const timeWeekAgoSec: number = (currTime - week) / 1000;
    const userFilter: string = `created > ${timeWeekAgoSec} && firstName != "" && lastName != ""`;
    const docFilter: string = `created > ${timeWeekAgoSec}`;
    const userDao: UserDao = new UserDao();
    const documentDao: DocumentDao = new DocumentDao();
    const documents: Document[] = await documentDao.getByFilter(docFilter);
    const users: User[] = await userDao.getByFilter(userFilter);
    var userDataList: UserStatData[] = [];
    var documentDataList: DocumentStatData[] = [];
    for (let usr of users) {
      userDataList.push({
        email: usr.email,
        firstName: usr.firstName,
        lastName: usr.lastName,
        incomingDocumentsCount: usr.incomingDocumentList.length,
        outgoingDocumentsCount: usr.outgoingDocumentList.length,
        id: usr.hashId
      });
    }
    for (let doc of documents) {
      const state: string = Array.from(doc.documentStateList).sort((a, b) => { return b.index - a.index; })[0].state || String();
      const lastEventType: string = doc.lastDocumentEvent?.type || String();
      documentDataList.push({
        name: doc.name,
        type: doc.type,
        lastEventType,
        state,
        id: doc.hashId
      });
    }
    return res.json({ USR_DATA: userDataList, DOC_DATA: documentDataList });
  } catch (e) {
    return res.json({ error: e.message });
  }

};