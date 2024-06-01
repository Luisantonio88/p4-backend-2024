import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const musicCourse = await db.course.create({
  data: {
    name: "Music",
  },
});
console.log(`created course with ID = ${musicCourse.courseId}`);

const designCourse = await db.course.create({
  data: {
    name: "Design",
  },
});
console.log(`created course with ID = ${designCourse.courseId}`);

const usuario = await db.user.create({
  data: {
    nick: "Luka",
    fullName: "Luka Doncic",
    lesson: {
      createMany: {
        data: [
          {
            courseId: musicCourse.courseId,
            text: "lesson 1",
          },
          {
            courseId: designCourse.courseId,
            text: "lesson 1",
          },
        ],
      },
    },
  },
});

console.log(`created user ${usuario.nick}`)
