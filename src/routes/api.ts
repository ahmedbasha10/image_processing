import express from 'express';
const apiRoute = express.Router();

apiRoute.get('/', (req: express.Request, res: express.Response) => {
  res.send('Welcome to image processing app');
});

export default apiRoute;
