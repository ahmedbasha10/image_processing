import sharp from 'sharp';

const processImage = async (
  imagePath: string,
  width: number,
  height: number,
  imageName: string
): Promise<boolean> => {
  try {
    await sharp(imagePath) // process image based on image name, width and height
      .resize(width, height)
      .toFile(`./src/thump/${imageName}.webp`);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default processImage;
