import express from 'express';
import morgan from 'morgan';
import { AppDataSource } from './data-source';
import trim from './middleware/trim';
import authRoutes from './routes/auth';

const app = express();
const port = 3001;

app.use(express.json());
app.use(morgan('dev'));
app.use(trim);

app.get('/', (_, res) => res.send('Hello World'));
app.use('/api/auth', authRoutes);

app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);

  try {
    await AppDataSource.initialize();
    console.log('Database initialized and connected!');
  } catch (error) {
    console.error(error);
  }
});
