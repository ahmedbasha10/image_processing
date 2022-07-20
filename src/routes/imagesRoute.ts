import express from 'express';
import path from 'path';
import processImage from '../utilities/imageProcess';
import { storeImages, readImages } from '../utilities/fileManagement';
const route = express.Router();

route.get('/', (req: express.Request, res: express.Response) => {
  try {
    const inputImage = `./images/${req.query.filename}.jpg`; // properities of the image
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    const imageName = (req.query.filename as string) + width + height;
    if (isNaN(width) || isNaN(height)) {
      res.send('width or height are not a numbers, please enter valid value');
    } else {
      readImages(path.join(__dirname, '../', 'cachFile.txt'), imageName) // check if the image exists at cach file so we can load it
        .then((result: boolean) => {
          if (result) {
            res.sendFile(
              path.join(__dirname, '../', `thump`, `${imageName}.webp`)
            );
          } else {
            // if image doesn't exist we have to process it and store it at cach
            processImage(inputImage, width, height, imageName).then(
              (result: boolean) => {
                if (result) {
                  storeImages(imageName + '\n');
                  res.sendFile(
                    path.join(__dirname, '../', `thump`, `${imageName}.webp`)
                  );
                } else {
                  res.send('Image is not found');
                }
              }
            );
          }
        });
    }
  } catch (err) {
    res.send(err);
  }
});

export default route;
