import { Router } from 'express';
import { createCourse } from '../controllers/courses';

const router = Router();


router.get('/', (req, res) => {});
router.get('/:id', (req, res) => {});
router.post("/", createCourse);
router.delete("/:id");
router.put("/:id");


export { router as coursesRouter };