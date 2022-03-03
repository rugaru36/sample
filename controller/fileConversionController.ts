import { UploadedFile } from 'express-fileupload';
import { Request, Response } from 'express';
import { FileConversionService } from '@root/service/fileConversion/fileConversionService';
import { User } from '@model/models';

export const postConvertFile = async (req: Request, res: Response) => {
  try {
    const fileService: FileConversionService = new FileConversionService();
    const file: UploadedFile | undefined = req.files?.file as UploadedFile;
    const user: User = req.body.user;
    const userAgentSource: string = req.useragent?.source || String();
    if (!file) { throw new Error('no file in request'); }
    return res.json(await fileService.convertFile(file, user, userAgentSource));
  } catch (e) {
    console.log("postUploadFile", e.message);
    return res.json({ error: 'check logs for information' });
  }
};