import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (localFilePath: any) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteCloudinary = async (fileId: string) => {
  try {
    if (!fileId) return null;

    const response = await cloudinary.uploader.destroy(fileId);

    return response;
  } catch (error) {
    throw new Error("Cloudinary deletation failed!");
  }
};

export { uploadCloudinary, deleteCloudinary };
