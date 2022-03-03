import { ImageService } from '@root/service/imageUpload/imageUploadService';
import { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import { UploadImageOutput } from '@root/service/imageUpload/types/imageTypes';

// MARK: UI

export const postUploadImage = async (req: Request, res: Response) => {
  try {
    console.log('postImage GO!');
    let service = new ImageService();
    if (req.files) {
      let result: UploadImageOutput = await service.uploadImage(req.files.file as fileUpload.UploadedFile);
      console.log('result', result);
      return res.json(result);
    } else {
      throw Error('no files in request');
    }
  } catch (e) {
    console.error(`deliveryController.postDelivery error: ${e.message}`);
    return res.json({ error: e.message });
  }
};