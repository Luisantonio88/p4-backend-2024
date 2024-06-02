import { Router } from "express";
import { db } from "./db";
import { send } from "./response";
import { z } from "zod";
import { catchErrors } from "./errors";

const coursesRouter = Router();

const idParamSchema = z.object({
  id: z.coerce.number(),
});

const courseBodySchema = z.object({
  name: z.string().min(5).max(200),
});

coursesRouter.get(
  "/",
  catchErrors(async (req, res) => {
    const courses = await db.course.findMany();
    send(res).ok(courses);
  })
);

coursesRouter.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: courseId } = idParamSchema.parse(req.params);
    const course = await db.course.findUniqueOrThrow({ where: { courseId } });
    send(res).ok({ course });
  })
);

coursesRouter.post(
  "/",
  catchErrors(async (req, res) => {
    const data = courseBodySchema.parse(req.body);
    const course = await db.course.create({ data });
    send(res).createOk(course);
  })
);

coursesRouter.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: courseId } = idParamSchema.parse(req.params);
    const courseData = courseBodySchema.parse(req.body);

    const updateCourse = await db.course.update({
      where: { courseId },
      data: courseData,
    });

    send(res).ok(updateCourse);
  })
);

coursesRouter.delete(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: courseId } = idParamSchema.parse(req.params);
    const deleteCourse = await db.course.delete({
      where: { courseId },
    });
    send(res).ok(deleteCourse);
  })
);

export default coursesRouter;
