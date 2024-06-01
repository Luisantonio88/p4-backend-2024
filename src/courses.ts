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
    try{
        const courses = await db.course.findMany();
        res.status(200).json(courses);
    } catch (e) {
        res.status(500).json({ error: "Internal error"})
    }
    
})

export default router
