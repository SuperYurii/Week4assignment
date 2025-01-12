import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();

app.use(express.json());

app.use(cors());
//I need to set up a port

app.listen(8080, () => {
  console.log(`Server running on PORT 8080`);
});
//Эта функция запускает сервер и заставляет его "слушать" (ожидать) входящие запросы на порт 8080.

//I need a root route --> the task is to READ data / the method is get
// http://localhost:8080/ --> this is the address

// app.get("/", (req, res) => {
//   res.json({ message: "This is the root route. First step!" });
// });

dotenv.config();
//I need to use the connection string that identifies my Supabase database
//Our connection string password is sensitive info! We CANNOT have it in our code.
//To store secrets in our server, we are using the .env file
//We are going to "import" our connection string stored in the .env file, so we can use it in the server file
const dbConnectionString = process.env.DATABASE_URL;

//We need to set up a database pool to properly connect our database and server by creating a query pool
export const db = new pg.Pool({
  connectionString: dbConnectionString,
});
//Эта строка кода создает пул подключений к базе данных PostgreSQL с использованием библиотеки pg.

//I want to add a route that READS data from the database
//When we request data from the database, we don't know how long it is going to take for the request to be fulfilled.
//! We need to make the query asynchronous
app.get("/guestbook", async (req, res) => {
  //   //We need to query the database to send us the data from the table
  const query = await db.query(`SELECT guest_name FROM guestbook`);
  //   //We need to translate the data into a language our server understands (JSON) and we can also wrangle the data to only give us the "rows" array
  await res.json(query.rows);
});

// age: "36";
// email: "pavlenkoyura88@gmail.com";
// gender: "male";
// is_student: false;
// location: "London";
// student: "on";
// username: "Yurii Pavlenko";
// app.post("/newguest", async (req, res) => {
//   console.log(req.body);
//   res.send(200);
// });
