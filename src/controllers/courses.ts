import { Request, Response } from "express";
import { type CourseInput } from '../models/zod-schemas';


export function getCourse(req: Request, res: Response) {

}

export function getAllCourses(req: Request, res: Response) {

}

export function createCourse(req: Request, res: Response) {
  const body: CourseInput = req.body;

  res.send({ data: { t: body.title, d: body.description }});
}

export function deleteCourse(req: Request, res: Response) {

}

export function updateCourse(req: Request, res: Response) {

}
