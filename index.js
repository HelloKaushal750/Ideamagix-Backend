const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {connection} = require('./config/db')
const {UserController} = require("./routes/User.route")
const {authenticate} = require('./middleware/authenticate')
const {AdminController} = require("./routes/Admin.route")
const {InstructorController} = require('./routes/Instructor.route');

const app = express();

app.use(express.json());

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Homepage")
})

app.use("/",UserController)

app.use(authenticate);

app.use("/admin",AdminController)

app.use("/instructor",InstructorController);

const port = process.env.PORT;

connection.then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log("Connected to Database");
  });
});