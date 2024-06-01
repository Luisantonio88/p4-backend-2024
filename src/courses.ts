import { Router } from "express";
import { db } from "./db";

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
    res.status(200).json(courses);
  } catch (e) {
    res.status(500).json({ error: "Internal error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    if (name === undefined || typeof name !== "string") {
      return res.status(400).json({
        error: "Missing name",
      });
    }

    const course = await db.course.create({
      data: { name },
    });
    res.status(201).json(course);
  } catch (e) {
    res.status(500).json({
      error: "Couldn'nt create course. Try again later.",
    });
  }
});

export default router;
