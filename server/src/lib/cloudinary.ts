import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

// Configure Cloudinary
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

/**
 * Upload image to Cloudinary
 * @param file - File buffer or base64 string
 * @param folder - Folder path in Cloudinary (e.g., 'products', 'categories', 'courses')
 * @param publicId - Optional public ID for the image
 * @returns Cloudinary upload result with secure URL
 */
export async function uploadToCloudinary(
  file: Buffer | string,
  folder: string = 'softynix',
  publicId?: string
): Promise<{ url: string; public_id: string; secure_url: string }> {
  try {
    const uploadOptions: any = {
      folder: folder,
      resource_type: 'image',
      overwrite: true,
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    let uploadResult: any;
    if (Buffer.isBuffer(file)) {
      // Upload from buffer
      uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          uploadOptions,
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(file);
      });
    } else {
      // Upload from base64 or URL
      uploadResult = await cloudinary.uploader.upload(file, uploadOptions);
    }

    if (!uploadResult || !uploadResult.url || !uploadResult.public_id || !uploadResult.secure_url) {
      throw new Error('Upload failed - no result returned');
    }

    return {
      url: uploadResult.url as string,
      public_id: uploadResult.public_id as string,
      secure_url: uploadResult.secure_url as string,
    };
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Failed to upload image to Cloudinary: ${error.message}`);
  }
}

/**
 * Upload multiple images to Cloudinary
 * @param files - Array of file buffers or base64 strings
 * @param folder - Folder path in Cloudinary
 * @returns Array of Cloudinary upload results
 */
export async function uploadMultipleToCloudinary(
  files: (Buffer | string)[],
  folder: string = 'softynix'
): Promise<Array<{ url: string; public_id: string; secure_url: string }>> {
  try {
    const uploadPromises = files.map((file) =>
      uploadToCloudinary(file, folder)
    );
    return await Promise.all(uploadPromises);
  } catch (error: any) {
    console.error('Cloudinary multiple upload error:', error);
    throw new Error(`Failed to upload images to Cloudinary: ${error.message}`);
  }
}

/**
 * Delete image from Cloudinary
 * @param publicId - Public ID of the image to delete
 * @returns Deletion result
 */
export async function deleteFromCloudinary(
  publicId: string
): Promise<any> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error: any) {
    console.error('Cloudinary delete error:', error);
    throw new Error(`Failed to delete image from Cloudinary: ${error.message}`);
  }
}

/**
 * Extract public ID from Cloudinary URL
 * @param url - Cloudinary URL
 * @returns Public ID or null
 */
export function extractPublicIdFromUrl(url: string | null | undefined): string | null {
  try {
    if (!url) return null;
    // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/image/upload/{version}/{public_id}.{format}
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
    return match && match[1] ? match[1] : null;
  } catch {
    return null;
  }
}

