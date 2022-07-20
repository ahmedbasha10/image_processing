import express from 'express';
import route from './routes/imagesRoute';
import apiRoute from './routes/api';

const app = express();

app.use('/api', apiRoute);
app.use('/api/images', route);

app.listen(3000, () => {
  console.log('server is running on port 3000');
});

export default app;
