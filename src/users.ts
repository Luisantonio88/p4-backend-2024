import { Router } from "express";
import { db } from "./db";
import { send } from "./response";
import { z } from "zod";
import { catchErrors } from "./errors";

const usersRouter = Router();

const idParamSchema = z.object({
  id: z.coerce.number(),
});

const userBodySchema = z.object({
  nick: z.string().min(5).max(200),
  fullName: z.string(),
});

usersRouter.get(
  "/",
  catchErrors(async (req, res) => {
    const users = await db.user.findMany();
    send(res).ok(users);
  })
);

usersRouter.get(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: userId } = idParamSchema.parse(req.params);
    const user = await db.user.findUniqueOrThrow({ where: { userId } });
    send(res).ok({ user });
  })
);

usersRouter.post(
  "/",
  catchErrors(async (req, res) => {
    const data = userBodySchema.parse(req.body);
    const user = await db.user.create({ data });
    send(res).createOk(user);
  })
);

usersRouter.put(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: userId } = idParamSchema.parse(req.params);
    const courseData = userBodySchema.parse(req.body);

    const updateUser = await db.user.update({
      where: { userId },
      data: courseData,
    });

    send(res).ok(updateUser);
  })
);

usersRouter.delete(
  "/:id",
  catchErrors(async (req, res) => {
    const { id: userId } = idParamSchema.parse(req.params);
    const deleteUser = await db.user.delete({
      where: { userId },
    });
    send(res).ok(deleteUser);
  })
);

export default usersRouter;
