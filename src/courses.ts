import { Router } from "express";
import { db } from "./db";
import { send } from "./response";

const router = Router();

/*
GET     /courses/
POST    /courses/
GET     /courses/:id
PUT     /courses/:id
DELETE  /courses/:id
*/

router.get("/", async (req, res) => {
  try {
    const courses = await db.course.findMany();
    send(res).ok(courses);
  } catch (e) {
    send(res).internalError("Could not get forum.");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const course = await db.course.findUniqueOrThrow({
      where: { courseId: Number(id) },
    });
    send(res).ok({ course });
  } catch (e: any) {
    if (e.name === "NotFoundError") {
      return send(res).notFound();
    }
    send(res).internalError("Internal Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (name === undefined || typeof name !== "string") {
      return send(res).badRequest("Missing name field");
    }
    const course = await db.course.create({
      data: { name },
    });
    send(res).createOk(course);
  } catch (e) {
    send(res).internalError("Couldn't create forum.");
  }
});

export default router;
