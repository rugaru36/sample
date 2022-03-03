import { Request, Response } from 'express';
import { HandshakeService } from '@service/handshake/handshakeService';
import { HandshakeRes } from '@root/service/handshake/types/handshakeTypes';

export const postHandshake = async (req: Request, res: Response) => {
  try {
    console.log('postHandshake');
    const handshakeService = new HandshakeService();
    console.log(req.body.deviceId);
    const result: HandshakeRes = await handshakeService.handshake(req.body);
    return res.json(result);
  } catch (e) {
    console.error(`postHandshake ${e.message}`);
    return res.json({ error: e.message });
  }
};