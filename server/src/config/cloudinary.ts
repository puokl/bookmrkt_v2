import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
dotenv.config();

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    // api_key: process.env.API_KEY,
    api_key: "876887691798952",
    api_secret: process.env.API_SECRET,
    secure: true,
  });
};

export default cloudinaryConfig;
