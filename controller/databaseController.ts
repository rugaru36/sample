import { Request, Response } from 'express';
import { DatabaseService } from '@service/database/databaseService';

export const postDatabase = async (req: Request, res: Response) => {
  try {
    let databaseService = new DatabaseService();
    await databaseService.parseRequest(req.body);
    let result: any = await databaseService.provideRequest();
    if (result) {
      if (req.body.elementId !== String()) return res.json(result);
      return res.json(Array.from(result));
    }
    return res.json({ result });
  } catch (e) {
    console.error(`databaseController err ${e}`);
    return res.json({ error: e.message });
  }
};