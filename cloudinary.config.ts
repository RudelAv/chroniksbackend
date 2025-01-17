import { v2 as cloudinary } from 'cloudinary';

interface CloudinaryConfig {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}

/**
 * Cloudinary configuration
 * @param cloud_name - Cloudinary cloud name
 * @param api_key - Cloudinary API key
 * @param api_secret - Cloudinary API secret
 * @returns Cloudinary configuration
 */
const config: CloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
};

cloudinary.config(config);

export default cloudinary;
