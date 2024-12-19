import express, { Application } from 'express';
import cors from 'cors';
import router from './routes';
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
