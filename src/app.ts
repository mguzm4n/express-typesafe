import express from 'express';
import cors from 'cors';
import routes from './routes';
import { ResourceNotFoundError } from './errors';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // frontend
  optionsSuccessStatus: 200,       // legacy browser support
}));

app.use(express.json());

// define all routes
app.use('/api/v1', routes);

// global error handler 
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  // defaults
  let status = 500;
  let errorMessage = 'Internal Server Error';

  // ResourceNotFound
  if (err instanceof ResourceNotFoundError) {
    status = 404;
    errorMessage = err.message; 
  }

  // logs
  console.error('Error:', err);

  res.status(status).json({ error: errorMessage });
});

export default app;
