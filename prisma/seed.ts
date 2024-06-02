import { db } from "../src/db";

const courses = await db.course.createMany({
  data: [
    { name: "Football" },
    { name: "Basketball" },
    { name: "Tennis" },
    { name: "Boxing" },
    { name: "Running" },
  ],
});
console.log(`Created 5 courses.`);

const users = await db.user.createMany({
  data: [
    { nick: "Leo", fullName: "Lionel Messi" },
    { nick: "Steph", fullName: "Stephen Curry" },
    { nick: "Roger", fullName: "Roger Federer" },
    { nick: "Ali", fullName: "Muhammad Ali" },
    { nick: "Noah", fullName: "Noah Lyles" },
  ],
});
console.log(`created 5 users.`);

const lessons = await db.lesson.createMany({
  data: [
    { text: "Football 101", courseId: 1, userId: 1 },
    { text: "Basketball 101", courseId: 2, userId: 2 },
    { text: "Tennis 101", courseId: 3, userId: 3 },
    { text: "Boxing 101", courseId: 4, userId: 4 },
    { text: "Running 101", courseId: 5, userId: 5 },
  ],
});

console.log(`created 5 lessons.`);
