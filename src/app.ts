import 'dotenv/config';
import express, { Application } from 'express';
import { errorHandler } from './middleware/error-handler';
import taskRoutes from './routes/tasks';

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

if (!process.env.PORT) {
  throw new Error('PORT is required');
}

app.use(express.json());
app.use('/api/v1/tasks', taskRoutes);

// Serve static files
app.use(express.static('./public'));
app.use(errorHandler);

process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
