import { UploadedFile } from 'express-fileupload';
import { Request, Response } from 'express';
import { ImageBackgroundRemovalService } from '@root/service/imageBackgroundRemoval/imageBackgroundRemovalService';

export const postConvertImage = async (req: Request, res: Response) => {
  try {
    const imageService: ImageBackgroundRemovalService = new ImageBackgroundRemovalService();
    const file = req.files?.file;
    const imageType: string = req.body.imageType;
    if (!file) { throw new Error('no file in request'); }
    return res.json(await imageService.convertImage(file as UploadedFile, req.body.user, imageType));
  } catch (e) {
    console.log("postUploadFile", e.message);
    return res.json({ error: 'check logs for information' });
  }
};