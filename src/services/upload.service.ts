import Cloudinary from '../utils/cloudinary';

class UploadService {
  static single = async (file: Express.Multer.File): Promise<string> => {
    return Cloudinary.upload(file.path);
  };

  static multiple = async (
    files: { [p: string]: Express.Multer.File[] } | Express.Multer.File[],
  ): Promise<string[]> => {
    const urls = [];

    for (const file of files as Express.Multer.File[]) {
      if (file.path) {
        const url = await Cloudinary.upload(file.path);
        urls.push(url);
      }
    }

    return urls;
  };
}

export default UploadService;
