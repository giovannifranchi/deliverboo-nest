import { extname } from 'path';
import * as multer from 'multer';

export const storage = multer.diskStorage({
  destination: './uploads', 
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
  }
});