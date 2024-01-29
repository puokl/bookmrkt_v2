import multer, { FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({});

function fileFilter(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) {
  const extension = path.extname(file.originalname);

  if (extension !== ".jpg" && extension !== ".png" && extension !== ".jpeg") {
    cb(null, false);
  } else {
    cb(null, true);
  }
}

const multerUpload = multer({ storage, fileFilter });

export default multerUpload;
