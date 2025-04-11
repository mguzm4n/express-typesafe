import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(8, 'title must be at least 8 characters long'),
  description: z.string().min(16, 'description must be at least 16 characters long'),
});

export type CourseInput = z.infer<typeof createCourseSchema>;