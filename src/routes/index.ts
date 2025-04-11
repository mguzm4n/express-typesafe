import { Router } from 'express';
import { coursesRouter } from './courses';

const router = Router();


router.use('/courses', coursesRouter);


router.get('/', (req, res) => {
  res.json({ message: 'API' });
});

export default router;