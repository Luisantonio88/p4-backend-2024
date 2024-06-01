import express from "express";
import morgan from "morgan";
import cors from 'cors';
import { db } from "./db";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/courses", async (req, res) => {
    try{
        const courses = await db.course.findMany();
        res.status(200).json(courses);
    } catch (e) {
        res.status(500).json({ error: "Internal error"})
    }
    
})

const {PORT} = process.env;
app.listen( PORT, () => {
    console.log(`Forum listening on : http://localhost:${PORT}`)
} )