import { db } from '../database/realm';
import { Request, Response } from 'express';

export const getSchema = async (req: Request, res: Response) => {
  try {
    return res.json({ schema: db.realm.schema });
  } catch (e) {
    console.error(`getSchema: ${e.message}`);
    return res.json({ error: e.message });
  }
};

