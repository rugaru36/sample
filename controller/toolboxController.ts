import { Request, Response } from 'express';

// database hotfixes
export const getToolbox = async (req: Request, res: Response) => {
  try {
    return res.json({ status: 'success' });
  } catch (e) {
    let err = e as Error;
    console.error(`getToolbox: ${(e as Error).message}`);
    return res.json({ error: err.message });
  }
};