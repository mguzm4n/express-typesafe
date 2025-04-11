import { Router } from 'express';
import { createCourse } from '../controllers/courses';
import { validateBody } from '../middleware';
import { createCourseSchema } from '../models/zod-schemas';

const router = Router();


// router.get('/', (req, res) => {});
// router.get('/:id', (req, res) => {});

router.post(
  "/", 
  validateBody(createCourseSchema), 
  createCourse,
);

// router.delete("/:id");
// router.put("/:id");


export { router as coursesRouter };