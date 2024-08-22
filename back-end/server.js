const express = require("express");
const hostname = "127.0.0.1";
const PORT = 3000;
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const notesRoutes = require("./routes/notesRoutes");

const app = express();
app.use(userRoutes);
app.use(express.json());
const Note = require("./models/Notes");
app.use(notesRoutes);

app.use(express.urlencoded({ extended: true })); // recieve json files

mongoose.connect("mongodb+srv://notefinal:notePwd@notes.rhkr5v6.mongodb.net/", {
  dbName: "noteApp-db",
});

const database = mongoose.connection;
database.once("open", () => {
  console.log("connected to MongoDB");
});
app.listen(PORT, hostname, () => {
  console.log("listening to port:", PORT);
});
