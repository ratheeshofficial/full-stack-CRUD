// console.log("App Start");
const express = require("express");
const app = express();
const cors = require("cors"); //to conect api frontend to backend
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const mongoose = require("mongoose");

// const userQueries = require("./user/userqueries");
// const userModel = require("./user/userModel");
app.use(morgan("dev"));
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
  password: String,
});

const registerInfo = mongoose.model("register", loginSchema);

// const data = new registerInfo({
//   email: "admin@gmail.com",
//   password: "qwerty123",
// });
// data.save();

app.post("/api/user", async (req, res) => {
  try {
    // console.log(req.body);
    let isEmailExist = await registerInfo.findOne({
      email: req.body.values.email,
    });
    if (isEmailExist) {
      res.status(500).json({ message: "email already exist" });
    } else {
      let genSalt = await bcrypt.genSalt(20);
      let hashpassword = await bcrypt.hash(req.body.values.password, genSalt);
      const firstName = req.body.values.firstName;
      const lastName = req.body.values.lastName;
      const email = req.body.values.email;
      const password = hashpassword;
      const result = await registerInfo({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      result.save();
      console.log(result);
      res.status(200).json({ success: true, person: result });
    }

    // console.log(firstName, lastName, email);

    // const oldUser = registerInfo.findOne({ email });
    // console.log(oldUser);

    // if (oldUser) {
    //   return res.json({ error: "User Exists" });
    // }
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false });
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

app.delete("/api/user/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await registerInfo.findByIdAndDelete({ _id: id });
    res.status(200).json({ success: true, id: id });
  } catch (error) {
    console.log("deleted");
    res.status(500).json({ success: false });
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.values.email;
    console.log(email, "qwert");
    const password = req.body.values.password;
    let isEmailExist = await registerInfo.findOne({ email: email });

    if (isEmailExist) {
      console.log(isEmailExist);
      let decode = await bcrypt.compare(password, isEmailExist.password);
      if (decode) {
        // jwt
        console.log(decode);
      } else {
        res.status(401).json({ message: "password incorrect" });
      }
    } else {
      res.status(401).json({ message: "unAuthorized" });
    }
    // res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
  // const hashPassword = await bcrypt.compare(password, salt);
  // console.log(email, password, salt, hashPassword);
  // const findEmail = re
  // const a = registerInfo.find({}, (err, result) => {
  //   if (err) {
  //     res.send(err);
  //   }
  //   result.map((data) => {
  //     if (data.email === email) {
  //       console.log("success");
  //     } else {
  //       console.log("error");
  //     }
  //   });
  //   res.send(result);
  // });
  // const a = registerInfo.findOne({ email: email }, (err, result) => {
  //   return result;
  // });
  // console.log(a);
  // if (a) {
  //   console.log("success");
  // } else {
  //   console.log("error");
  // }
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
