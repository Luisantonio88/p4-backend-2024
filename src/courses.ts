import { Router } from "express";
import { db } from "./db";
import { send } from "./response";
import { z } from "zod";

const router = Router();

/*
GET     /courses/
POST    /courses/
GET     /courses/:id
PUT     /courses/:id
DELETE  /courses/:id
*/

const idParamSchema = z.object({
  id: z.coerce.number(),
});

const courseBodySchema = z.object({
  name: z.string().min(5).max(200),
});

router.get("/", async (req, res, next) => {
  try {
    const courses = await db.course.findMany();
    send(res).ok(courses);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id: courseId } = idParamSchema.parse(req.params);
    const course = await db.course.findUniqueOrThrow({ where: { courseId } });
    send(res).ok({ course });
  } catch (e: any) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = courseBodySchema.parse(req.body);
    const course = await db.course.create({ data });
    send(res).createOk(course);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id: courseId } = idParamSchema.parse(req.params);
    const courseData = courseBodySchema.parse(req.body);

    const updateCourse = await db.course.update({
      where: { courseId },
      data: courseData,
    });

    send(res).ok(updateCourse);
  } catch (e) {
    next(e);
  }
});

export default router;
