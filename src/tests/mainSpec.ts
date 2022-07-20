import supertest from 'supertest';
import app from '../main';
import processImage from '../utilities/imageProcess';
import { storeImages, readImages } from '../utilities/fileManagement';

const req = supertest(app);
describe('test image processing end point response', () => {
  // test if we can access api end point
  it('access end point', async () => {
    const res = await req.get('/api');
    expect(res.status).toBe(200);
  });

  it('access end point', async () => {
    const res = await req.get('/api/images');
    expect(res.status).toBe(200);
  });
});

describe('test image transformation', () => {
  // test if we can transform image exists at our server
  it('Expect to process image without error', async () => {
    const result = await processImage(
      '././images/fjord.jpg',
      200,
      200,
      'fjord'
    );
    expect(result).toBeTrue();
  });

  it('Expect to throw error when file is not exist', async () => {
    // should be false if tried to access non exist image
    const result = await processImage(
      '././images/Egypt.jpg',
      300,
      300,
      'Egypt'
    );
    expect(result).toBeFalse();
  });
});

describe('test cach file methods', () => {
  it('Expect to store image name at cach file successfully', async () => {
    // check if we can store image name at cach file successfully
    const result = await storeImages('fjord200200\n');
    expect(result).toBeTrue();
  });

  it('Expect to read cach file successfully return true if it find the image', async () => {
    // return true if the image exist
    const result = await readImages('./src/cachFile.txt', 'fjord200200');
    expect(result).toBeTrue();
  });

  it('Expect to read cach file successfully return false if it did not find the image', async () => {
    const result = await readImages('./src/cachFile.txt', 'Argentina200200');
    expect(result).toBeFalse();
  });
});

