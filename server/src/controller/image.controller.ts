import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";

// @desc    Upload an image
// @route   POST /api/imageUpload/
// @access  Private
export const uploadImageHandler = async (req: Request, res: Response) => {
  const { folder } = req.body;

  console.log("{folder}", { folder });
  if (req.file) {
    try {
      const uploadImage = await cloudinary.uploader.upload(req.file.path, {
        folder: folder,
        secure: true,
      });
      console.log("uploadImage", uploadImage);

      res.status(201).json(uploadImage.secure_url);
    } catch (error) {
      console.log("Error uploading file", error);
    }
  } else {
    res.status(500).json({ message: "file type not accepted" });
  }
};

export const uploadMultipleImageHandler = async (
  req: Request,
  res: Response
) => {
  if (!req.files || req.files.length === 0) {
    // No files uploaded
    return res.status(400).json({ message: "No files uploaded" });
  }
  if (req.files) {
    try {
      const uploadPromises = (req.files as Express.Multer.File[]).map(
        (file: Express.Multer.File) =>
          cloudinary.uploader.upload(file.path, { folder: "bookMarktApp" })
      );

      const uploadedImages = await Promise.all(uploadPromises);

      const imageUrls = uploadedImages.map(
        (uploadResult: any) => uploadResult.url
      );

      res.status(201).json({ avatars: imageUrls });
    } catch (error) {
      console.log("Error uploading files", error);
      res.status(500).json({ message: "Error uploading files" });
    }
  }
  // else {
  //   res.status(500).json({ message: "No files uploaded" });
  // }
};
