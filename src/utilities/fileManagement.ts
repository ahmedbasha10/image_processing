import { promises as fs } from 'fs';
import csv from 'csvtojson';

export const storeImages = async (fileName: string): Promise<boolean> => {
  // function to store image at cach file
  try {
    const imagesFile = await fs.open('./src/cachFile.txt', 'a+');
    await imagesFile.write(fileName as string);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const readImages = async (
  filePath: string,
  searchImage: string
): Promise<boolean> => {
  // read cach file to check if the image is processed before
  let found = false;
  await csv()
    .fromFile(filePath)
    .then((images) => {
      images.map((item: { filename: string }) => {
        if (item.filename == searchImage) {
          found = true;
        }
      });
    });
  return found;
};
