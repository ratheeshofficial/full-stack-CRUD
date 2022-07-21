// console.log("App Start");
const express = require("express");
const app = express();
const cors = require("cors"); //to conect api frontend to backend

const mongoose = require("mongoose");

// const userQueries = require("./user/userqueries");
// const userModel = require("./user/userModel");

app.use(express.json()); //to know the json in terminal

app.use(cors()); //to connect api front end and back end

app.use(express.urlencoded({ extended: true }));

// const data = require("./data");

// app.get("/api", (req, res) => {
//   res.status(200).json({ users: ["Ratheesh", "Ajith", "Vijay", "Vikram"] });
// });

// app.get("/api/user", async (req, res) => {
//   try {
//     // const userDetails = await userModel.find();
//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.post("/api/new", async (req, res) => {
//   try {
//     // const body = await req.body;
//     console.log(req.body);
//     // res.status(201).json({ success: true, person: body });
//     userQueries.insertUser(req, res);
//   } catch (error) {
//     res.status(500).json({ success: false, msg: `Errorrrrrr`, error });
//   }
// });

const loginSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  // password: String,
});

const registerInfo = mongoose.model("register", loginSchema);

// const data = new registerInfo({
//   email: "admin@gmail.com",
//   password: "qwerty123",
// });
// data.save();

app.post("/api/user", async (req, res) => {
  try {
    console.log(req.body);
    const firstName = req.body.values.firstName;
    const lastName = req.body.values.lastName;
    const email = req.body.values.email;

    console.log(firstName, lastName, email);

    const result = await new registerInfo({
      firstName: firstName,
      lastName: lastName,
      email: email,
    });

    result.save();
    res.status(200).json({ success: true, person: result });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/user/get", (req, res) => {
  registerInfo.find({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

mongoose.connect(
  "mongodb://localhost:27017/testDB",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("db connected");
    } else {
      console.log("db error");
    }
  }
);

app.listen(5000, () => {
  console.log("server is started in 5000...");
});
