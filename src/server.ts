import express from 'express';
import morgan from 'morgan';
import { AppDataSource } from './data-source';
import authRoutes from './routes/auth';

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_, res) => res.send('Hello World'));
app.use('/api/auth', authRoutes);

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);

  try {
    await AppDataSource.initialize();
    console.log('Database initialized and connected!');
  } catch (error) {
    console.error(error);
  }
});
