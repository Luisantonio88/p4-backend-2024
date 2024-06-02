import { Router } from "express";
import { db } from "./db";
import { send } from "./response";
import { z } from "zod";
import { catchErrors } from "./errors";

const lessonsRouter = Router();

const idParamSchema = z.object({
  id: z.coerce.number(),
});

const lessonBodySchema = z.object({
  text: z.string().min(5).max(200),
  courseId: z.number(),
  userId: z.number().optional(),
});

lessonsRouter.get(
  "/",
  catchErrors(async (req, res) => {
    const lessons = await db.lesson.findMany();
    send(res).ok(lessons);
  })
);

lessonsRouter.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: lessonId } = idParamSchema.parse(req.params);
    const lesson = await db.lesson.findUniqueOrThrow({ where: { lessonId } });
    send(res).ok({ lesson });
  })
);

lessonsRouter.post(
  "/",
  catchErrors(async (req, res) => {
    const data = lessonBodySchema.parse(req.body);
    const lesson = await db.lesson.create({ data });
    send(res).createOk(lesson);
  })
);

lessonsRouter.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: lessonId } = idParamSchema.parse(req.params);
    const lessonData = lessonBodySchema.parse(req.body);

    const updateLesson = await db.lesson.update({
      where: { lessonId },
      data: lessonData,
    });

    send(res).ok(updateLesson);
  })
);

lessonsRouter.delete(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: lessonId } = idParamSchema.parse(req.params);
    const deleteLesson = await db.lesson.delete({
      where: { lessonId },
    });
    send(res).ok(deleteLesson);
  })
);

export default lessonsRouter;
