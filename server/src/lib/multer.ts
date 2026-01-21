import multer from 'multer';
import { Request, RequestHandler } from 'express';

// Configure multer to store files in memory (for Cloudinary upload)
const storage = multer.memoryStorage();

// File filter to only accept images
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Configure multer
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: fileFilter,
});

// Single image upload middleware
export const uploadSingle = (fieldName: string = 'image'): RequestHandler => {
  return upload.single(fieldName) as RequestHandler;
};

// Multiple images upload middleware
export const uploadMultiple = (fieldName: string = 'images', maxCount: number = 10): RequestHandler => {
  return upload.array(fieldName, maxCount) as RequestHandler;
};

// Multiple fields upload middleware
export const uploadFields = (fields: Array<{ name: string; maxCount?: number }>): RequestHandler => {
  return upload.fields(fields) as RequestHandler;
};

