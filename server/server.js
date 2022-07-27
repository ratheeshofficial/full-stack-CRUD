// console.log("App Start");
const express = require("express");
const app = express();
const cors = require("cors"); //to conect api frontend to backend
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const mongoose = require("mongoose");

app.use(morgan("dev"));
app.use(express.json()); //to know the json in terminal

app.use(cors()); //to connect api front end and back end

app.use(express.urlencoded({ extended: true }));

const loginSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const registerInfo = mongoose.model("register", loginSchema);

app.post("/api/user", async (req, res) => {
  try {
    // console.log(req.body);
    let isEmailExist = await registerInfo.findOne({
      email: req.body.email,
    });
    if (isEmailExist) {
      res.status(500).json({ success: false, message: "email already exist" });
    } else {
      let genSalt = await bcrypt.genSalt(20);
      let hashpassword = await bcrypt.hash(req.body.password, genSalt);
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;
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

app.put("/api/user/update/:id", async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  console.log(updateData);
  try {
    await registerInfo.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ success: true, id, updateData });
  } catch (error) {
    res.status(400).json({ success: false, msg: "error" });
  }
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
    let isEmailExist = await registerInfo.findOne({
      email: req.body.email,
    });
    if (isEmailExist) {
      console.log(isEmailExist);

      let decode = await bcrypt.compare(
        req.body.password,
        isEmailExist.password
      );
      if (decode) {
        // jwt
        console.log(decode);
        res.status(201).json({ success: true, message: "password Matched" });
      } else {
        res.status(401).json({ success: false, message: "password incorrect" });
      }
    } else {
      res.status(401).json({ success: false, message: "unAuthorized" });
    }
    // res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
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
