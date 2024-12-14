import axios from "axios";
import CryptoJS from "crypto-js";

// Upload Image
export const uploadImages = async (files) => {
  const uploadedImageUrls = [];

  for (const file of files) {
    const formDataImage = new FormData();
    formDataImage.append("file", file);
    formDataImage.append("upload_preset", "qslbztwu");

    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dfdds09gi/image/upload",
      formDataImage
    );

    uploadedImageUrls.push(uploadRes.data.secure_url);
  }
  return uploadedImageUrls;
};

// Delete Image
export const deleteImage = async (publicId) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const apiSecret = "CWwdvAJDPmKEGBmIAV7CTs_FfHA";

  const signature = CryptoJS.SHA1(
    `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
  ).toString();

  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("api_key", "714846284886461");

  try {
    const deleteRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dfdds09gi/image/destroy",
      formData
    );
    return deleteRes.data;
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};
