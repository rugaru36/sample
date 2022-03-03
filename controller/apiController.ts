import { Request, Response } from 'express';

export const postApi = async (req: Request, res: Response) => {
  try {
    console.log(`postApi GO!`);
    if (!req.body.user) throw Error('no user');
    const router = req.body.router;
    switch (router) {
      default:
        throw Error(`router ${router} is not found`);
    }
  } catch (e) {
    console.error(`postApi body: ${req.body}, error: ${e.message}`);
    return res.json({ error: e.message });
  }
};
