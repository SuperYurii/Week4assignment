import { db } from "./server.js";

db.query(
  `INSERT INTO guestbook (guest_name, gender, email, age, location, student_status)
      VALUES ('Yurii Pavlenko', 'Male', 'pavlenkoyura88@gmail.com', 36, 'Spain', false)`
);
